"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMock = void 0;

var isMock = function isMock(node) {
  var leadingComments = node.leadingComments;
  var foundIt = leadingComments === null || leadingComments === void 0 ? void 0 : leadingComments.find(function (comment) {
    return comment.value.includes("babel-plugin-removable-mocks");
  });
  return foundIt;
};

exports.isMock = isMock;