"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SharedHeader;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SharedHeader(_ref) {
  let {
    id,
    title
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    id: id
  }, title, "+1234"));
}
//# sourceMappingURL=index.js.map