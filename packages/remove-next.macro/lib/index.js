"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _babelPluginMacros = require("babel-plugin-macros");

var _babelPluginRemoveNext = _interopRequireDefault(require("babel-plugin-remove-next"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultConfig = {
  production: true
};

var _default = (0, _babelPluginMacros.createMacro)(function (_ref) {
  var state = _ref.state,
      references = _ref.references,
      _ref$config = _ref.config,
      config = _ref$config === void 0 ? defaultConfig : _ref$config,
      babel = _ref.babel;
  var program = state.file.path;

  if (references.removeNext) {
    references.removeNext.forEach(function (path) {
      var expression = path.findParent(function (p) {
        return p.isExpressionStatement();
      });

      if (expression) {
        if (expression.getNextSibling()) {
          babel.types.addComment(expression.getNextSibling().node, "leading", "babel-plugin-remove-next", true);
        }

        expression.remove();
      }
    });
  } // if(references.removeNextJSX) {
  //   references.removeNextJSX.forEach((path) => {
  // 		const expression = path.findParent((p) => p.isCallExpression());
  //     if(expression) {
  //       const empty = babel.types.jsxEmptyExpression();
  //       babel.types.addComment(
  //         empty,
  //         "inner",
  //         "babel-plugin-remove-next",
  //         false
  //       );
  //       expression.replaceWith(empty);
  //     }
  //   });
  // }


  (0, _traverse["default"])(program.parent, (0, _babelPluginRemoveNext["default"])().visitor, undefined, {});
}, {
  configName: "removeNext"
});

exports["default"] = _default;