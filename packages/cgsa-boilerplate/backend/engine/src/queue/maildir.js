const os = require('os');
const path = require('path');
const util = require('util');
const async = require('async');
const events = require('events');
const crypto = require('crypto');

const TMP = 0;
const NEW = 1;
const CUR = 2;

class Maildir extends events.EventEmitter {
  constructor(root) {
    super();

    this.pushed = 0;
    this.fs = require('graceful-fs');
    this.hostname = os.hostname();

    this.dirPaths = [
      path.resolve(path.join(root, 'tmp')),
      path.resolve(path.join(root, 'new')),
      path.resolve(path.join(root, 'cur'))
    ];
  }

  // Finds the length of the queue (list of files in new)
  length = (callback) => {
    this.fs.readdir(this.dirPaths[NEW], (err, files) => {
      if (err) {
        callback(err);
      } else {
        callback(null, files.length);
      }
    });
  }

  // Generates a universal uniq name for each message
  generateUniqueName = (callback) => {
    const that = this;
    const time = (new Date()).getTime();

    crypto.pseudoRandomBytes(8, (err, randomBytes) => {
      if (err) {
        callback(err);
      } else {
        callback(
          null,
          util.format(
            '%d.%d.%d.%d%d.%s',
            time,
            that.pushed++,
            process.pid,
            randomBytes.readUInt32BE(0),
            randomBytes.readUInt32BE(4),
            that.hostname
          )
        );
      }
    });
  }

  // Creates all folders required for maildir
  create = (persistent, cb) => {
    const that = this;
    async.each(this.dirPaths, (path, callback) => {
      that.fs.access(path, (error) => {
        if (error) {
          that.fs.mkdir(path, callback);
        } else {
          callback();
        }
      });
    }, () => {
      if (persistent) {
        that.watcher = that.fs.watch(that.dirPaths[NEW], {}, (err, messages) => {
          that.emit('new', [messages]);
        });
      }
      cb();
    });
  }

  stopWatching = () => {
    if (this.watcher && this.watcher.close) {
      this.watcher.close();
      this.watcher = null;
    }
  }

  // Creates a new message in the new folder
  newFile = (data, callback) => {
    const that = this;
    this.generateUniqueName((err, uniqueName) => {
      if (err) { callback(err); }
      else {
        const tmpPath = path.join(that.dirPaths[TMP], uniqueName);
        const newPath = path.join(that.dirPaths[NEW], uniqueName);
        that.fs.writeFile(tmpPath, data, (err) => {
          if (err) {
            callback(err);
          } else {
            that.fs.rename(tmpPath, newPath, callback);
          }
        });
      }
    });
  }

  // Lists all messages in the new folder
  listNew = (callback) => {
    this.fs.readdir(this.dirPaths[NEW], callback);
  }

  // Clears all messages from all folders
  clear = (callback) => {
    const that = this;
    async.map(this.dirPaths, that.fs.readdir, (err, results) => {
      if (err) { callback(err); }
      else {
        let unlinks = [], i, fn, len = that.dirPaths.length;
        const pushDir = (root) => {
          return (message) => {
            unlinks.push(path.join(root, message));
          };
        };
        for (i = 0; i < len; i++) {
          fn = pushDir(that.dirPaths[i]);
          results[i].forEach(fn);
        }
        async.each(unlinks, that.fs.unlink, callback);
      }
    });
  }

  // Processes one message from the queue (if possible)
  process = (message, callback) => {
    let newPath = path.join(this.dirPaths[NEW], message);
    let curPath = path.join(this.dirPaths[CUR], message);
    const that = this;

    this.fs.rename(newPath, curPath, (err) => {
      // if message could not be moved, another process probably already works
      // on it, so we try to pop again, but we try further on the list
      if (err) {
        callback(err);
      } else {
        that.fs.readFile(curPath, (err, data) => {
          if (err) { callback(err); }
          else {
            callback(null, data,
              // commit function
              (cb) => { that.fs.unlink(curPath, cb); },
              // rollback function
              (cb) => { that.fs.rename(curPath, newPath, cb); }
            );
          }
        });
      }
    });
  }
}

module.exports = {
  Maildir: Maildir
};