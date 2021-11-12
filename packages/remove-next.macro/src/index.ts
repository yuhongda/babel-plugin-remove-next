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
			references.removeNext.forEach((path) => {
				const expression = path.findParent((p) => p.isExpressionStatement());
				if (expression) {
					if (expression.getNextSibling()) {
						babel.types.addComment(
							expression.getNextSibling().node,
							"leading",
							"babel-plugin-remove-next",
							true
						);
					}
          expression.remove();
				}
			});
		}

		traverse(program.parent, babelPluginRemoveNext().visitor, undefined, {});
	},
	{
		configName: "removeNext",
	}
);

export declare function removeNext(): void;
