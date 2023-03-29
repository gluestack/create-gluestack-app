"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Pinned = exports.Default = exports.Archived = void 0;
var _react = _interopRequireDefault(require("react"));
var _Task = _interopRequireDefault(require("./Task"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  component: _Task.default,
  title: 'Task'
};
exports.default = _default;
const Template = args => /*#__PURE__*/_react.default.createElement(_Task.default, args);
const Default = Template.bind({});
exports.Default = Default;
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX'
  }
};
const Pinned = Template.bind({});
exports.Pinned = Pinned;
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED'
  }
};
const Archived = Template.bind({});
exports.Archived = Archived;
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED'
  }
};
//# sourceMappingURL=Task.stories.js.map