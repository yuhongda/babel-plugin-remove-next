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
				const removeNext = path.findParent((p) => p.isExpression());
				if (removeNext) {
					const nextPath = removeNext.getNextSibling();

					babel.types.addComment(
						path.node,
						"leading",
						"babel-plugin-remove-next",
            true
					);
					console.log(">>>>>>>>>>>>>>>>>>>>>>>>", nextPath);
				}

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
