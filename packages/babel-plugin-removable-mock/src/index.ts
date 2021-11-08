import * as t from "@babel/types";
import { NodePath } from "@babel/core";
import { isMock } from "./utils";

export default () => ({
	name: "babel-plugin-remove-next",
	visitor: {
		Program: {
			enter(path: NodePath<t.Node>, state: any) {
				path.traverse({
					VariableDeclaration: {
						enter(path) {
							if (isMock(path.node)) {
								path.node.leadingComments = null;
								path.remove();
							}
						},
					},
					FunctionDeclaration: {
						enter(path) {
              if (isMock(path.node)) {
								path.node.leadingComments = null;
								path.remove();
							}
            },
					},
					CallExpression: {
						enter(path) {
							if (isMock(path.node)) {
								path.node.leadingComments = null;
								path.remove();
							}
						},
					},
          JSXExpressionContainer: {
            enter(path) {
              if (isMock(path.node)) {
                path.getNextSibling().remove();
								path.remove();
							}
            },
          },
				});
			},
			exit(path: NodePath<t.Node>, state: any) {},
		},
	},
});
