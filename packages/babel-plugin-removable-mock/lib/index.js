"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  return {
    name: 'babel-plugin-removable-mock',
    visitor: {
      Program: {
        enter: function enter(path, state) {
          path.traverse({
            VariableDeclaration: {
              enter: function enter(path) {
                var leadingComments = path.node.leadingComments;
                console.log(path.node);
                var foundIt = leadingComments === null || leadingComments === void 0 ? void 0 : leadingComments.find(function (comment) {
                  return comment.value.includes('babel-plugin-removable-mocks');
                });

                if (foundIt) {
                  path.node.leadingComments = null;
                  path.remove();
                }
              }
            },
            CallExpression: {
              enter: function enter(path) {
                var callee = path.node.callee;
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