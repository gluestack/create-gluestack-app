import React from 'react';

// @ts-ignore
export default function Task(_ref) {
  let {
    task,
    onArchiveTask,
    onPinTask
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "list-item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title",
    "aria-label": task.title
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: task.title,
    readOnly: true,
    name: "title"
  })));
}
//# sourceMappingURL=Task.js.map