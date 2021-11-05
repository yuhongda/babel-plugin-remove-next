import * as t from "@babel/types";
import { NodePath } from "@babel/core";

export default () => ({
	name: 'babel-plugin-removable-mock',
	visitor: {
		Program: {
			enter(path: NodePath<t.Node>, state: any) {
				path.traverse({
					VariableDeclaration: {
						enter(path) {
							const { leadingComments } = path.node;
              const foundIt = leadingComments?.find(comment => comment.value.includes('babel-plugin-removable-mocks'));
              if (foundIt) {
                path.node.leadingComments = null;
                path.remove();
              }
						}
					},
          FunctionDeclaration: {
            enter(path) {
              
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
