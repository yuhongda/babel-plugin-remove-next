import * as t from "@babel/types";
import { NodePath } from "@babel/core";

export default () => ({
	name: "babel-plugin-removable-mock",
	visitor: {
		Program: {
			enter(path: NodePath<t.Node>, state: any) {
				path.traverse({
					VariableDeclaration: {
						enter(path) {
							const { declarations } = path.node;
							
						}
					},

					CallExpression: {
						enter(path) {
							const { callee } = path.node;
							
						}
					}
				});
			},
			exit(path: NodePath<t.Node>, state: any) {}
		}
	}
});
