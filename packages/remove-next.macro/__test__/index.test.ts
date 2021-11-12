import { join } from "path";
import pluginTester from "babel-plugin-tester";
import plugin from "babel-plugin-macros";

pluginTester({
	pluginName: "remove-next.macro",
	plugin,
	babelOptions: {
		parserOpts: {
			plugins: ["jsx"],
		},
		// plugins: ["macros"],
	},
	fixtures: join(__dirname, "fixtures"),
	snapshot: true,
});
