/**
 * Current implementation is for our alpha release. We will add a
 * full blown release of Queue & Jobs management as a plugin using
 * dapr's pub-sub in future.
 *
 * Queue system in our current application is based on file-system.
 * It uses a maildir implementation to store the messages.
 *
 * The queue is a FIFO queue. It is not possible to push messages
 * into the queue in a specific order. The queue is not persistent
 * and will be lost on restart.
 *
 * This implementation is not thread-safe. It is not possible to
 * push messages into the queue from multiple threads.
 *
 *
 * The queue is implemented as a class. It can be used like this:
 *
 *  const Queue = require('./queue');
 *  const queue = new Queue('.queue', (err) => {
 *    if (err) {
 *      throw err;
 *    } else {
 *      queue.push({ type: 'webhook', value: 'http://localhost:3000' });
 *    }
 *  });
 *
 */
const Maildir = require('./maildir').Maildir;

class Queue {
  constructor(options, cb) {
    let that = this, path, persistent = true;

    // determine maildir path
    path = (typeof options === 'string') ? options : options.path;

    // determine if maildir has a persistent watcher (default true)
    if (typeof options.persistent !== 'undefined') {
      persistent = options.persistent;
    }

    this.laterPop = [];
    this.maildir = new Maildir(path);
    this.maildir.fs = require('graceful-fs');

    // be notified, when new messages are available
    this.maildir.on('new', function(messages) {
      const callback = that.laterPop.shift();
      if (callback) {
        that.tpop(callback);
      }
    });

    // Create the queue with the given path
    this.maildir.create(persistent, cb);
  }

  // Pushs one message into the queue
  push (message, callback) {
    this.maildir.newFile(JSON.stringify(message), callback);
  }

  // Pops one message of the queue
  pop (callback) {
    this.tpop((err, message, commit, rollback) => {
      if (err) {
        callback(err);
      } else {
        commit((err) => {
          if (err) {
            callback(err);
          } else {
            callback(null, message);
          }
        });
      }
    });
  }

  // Pops one item in a transaction from the queue
  tpop (callback) {
    const that = this;
    this.maildir.listNew((err, messages) => {
      if (messages.length > 0) {
        that.tryPop(messages, callback);
      } else {
        that.laterPop.push(callback);
      }
    });
  }

  /*
  * Private function to try poping one item.
  * Analyse the error handling for:
  * - What should happen if the item couldn't be deleted?
  * - What should happen if the rename worked but the message can't be read?
  * - What if the message can be read but the message doesn't contain
  *   valid json?
  */
  tryPop (messages, callback) {
    let that = this;
    let message = messages.shift();

    this.maildir.process(message, (err, data, commit, rollback) => {
      if (err) {
        if (messages.length === 0) {
          that.laterPop.push(callback); // no elements to pop, try later...
        } else {
          that.tryPop(messages, callback);
        }
      } else {
        try {
          callback(null, JSON.parse(data), commit, rollback);
        } catch(exception) {
          callback(
            new Error('JSONError: Message ' + message + ' not valid! (' + exception + ')')
          );
        }
      }
    });
  }

  // Removes all elements from the queue
  clear (callback) {
    this.maildir.clear(callback);
  }

  // Determines the length of the queue
  length (callback) {
    this.maildir.length(callback);
  }

  // Determines if the directories are being monitored
  isRunning () {
    return !!this.maildir.watcher;
  }

  // Stops monitoring the queue directories
  stop () {
    this.maildir.stopWatching();
  }
}

module.exports = {
  Maildir: Maildir,
  Queue: Queue
};
