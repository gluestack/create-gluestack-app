"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Task;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore
function Task(_ref) {
  let {
    task,
    onArchiveTask,
    onPinTask
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "list-item"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "title",
    "aria-label": task.title
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: task.title,
    readOnly: true,
    name: "title"
  })));
}
//# sourceMappingURL=Task.js.map