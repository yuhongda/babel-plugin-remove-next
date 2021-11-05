import * as t from "@babel/types";
import { NodePath } from "@babel/core";
import { isMock } from "./utils";

export default () => ({
	name: "babel-plugin-removable-mock",
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
							const { callee } = path.node;
						},
					},
				});
			},
			exit(path: NodePath<t.Node>, state: any) {},
		},
	},
});
