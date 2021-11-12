"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

var _default = function _default() {
  return {
    name: "babel-plugin-remove-next",
    visitor: {
      Program: {
        enter: function enter(path, state) {
          path.traverse({
            ExpressionStatement: {
              enter: function enter(path) {
                if ((0, _utils.isMock)(path.node)) {
                  path.node.leadingComments = null;
                  path.remove();
                }
              }
            },
            VariableDeclaration: {
              enter: function enter(path) {
                if ((0, _utils.isMock)(path.node)) {
                  path.node.leadingComments = null;
                  path.remove();
                }
              }
            },
            FunctionDeclaration: {
              enter: function enter(path) {
                if ((0, _utils.isMock)(path.node)) {
                  path.node.leadingComments = null;
                  path.remove();
                }
              }
            },
            CallExpression: {
              enter: function enter(path) {
                if ((0, _utils.isMock)(path.node)) {
                  path.node.leadingComments = null;
                  path.remove();
                }
              }
            },
            JSXExpressionContainer: {
              enter: function enter(path) {
                if ((0, _utils.isMock)(path.node)) {
                  path.getNextSibling().remove();
                  path.remove();
                }
              }
            }
          });
        },
        exit: function exit(path, state) {}
      }
    }
  };
};

exports["default"] = _default;