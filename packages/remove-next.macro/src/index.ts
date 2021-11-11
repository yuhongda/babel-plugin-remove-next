import { createMacro } from "babel-plugin-macros";
import babelPluginRemoveNext from "babel-plugin-remove-next";
import traverse, { NodePath } from "@babel/traverse";

const defaultConfig = {
	production: true,
};

export default createMacro(
	({ state, references, config = defaultConfig, babel }) => {
		const program = state.file.path;

		if (references.removeNext) {
			// console.log(">>>>>>>>>>>>>>>>>>>>>>>>", references.removeNext);
			// references.removeNext[0].replaceWith(babel.types.);

			references.removeNext.forEach((path) => {
				// const nextNode = path.getNextSibling();
				const block = path.findParent((p) => p.isBlockStatement());
				// if (removeNext) {
				// console.log(">>>>>>>>>>>>>>>>>>>>>>>>", path);
				babel.types.addComment(
					(block?.get('body') as NodePath[])[2].node,
					"leading",
					"babel-plugin-remove-next",
					true
				);
				// babel.types.addComment(
				// 	(block?.get('body') as NodePath[])[1].node,
				// 	"leading",
				// 	"babel-plugin-remove-next",
				// 	true
				// );
				// babel.types.addComments(
				// 	(block?.get('body') as NodePath[])[1].node,
				// 	"leading",
				// 	[{
				// 		type: "CommentLine",
				// 		value: "babel-plugin-remove-next",
				// 	} as babel.types.Comment]
				// )
				// if (nextPath) {
				// 	babel.types.addComment(
				// 		nextPath.node,
				// 		"leading",
				// 		"babel-plugin-remove-next",
				// 		true
				// 	);
				// }
				// removeNext.remove();
				// console.log(">>>>>>>>>>>>>>>>>>>>>>>>", path);
				// }

				// path.remove();
			});
		}

		traverse(program.parent, babelPluginRemoveNext().visitor, undefined, {});
	},
	{
		configName: "removeNext",
	}
);

export declare function removeNext(): void;
