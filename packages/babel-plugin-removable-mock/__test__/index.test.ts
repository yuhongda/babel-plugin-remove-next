import { transformSync } from "@babel/core";
import { format } from "prettier";
import presetTypescript from "@babel/preset-typescript";
import babelPluginRemovableMock from "../src/index";
import {
	variableDeclarationTransformSnapshot,
} from "./snapshot/transform.snapshot";

export function transform(code: string) {
	const result = transformSync(code, {
		retainLines: true,
		presets: [[presetTypescript, { allExtensions: true, isTSX: true }]],
		plugins: [babelPluginRemovableMock]
	});

	if (result?.code == null) {
		return code;
	}

	return format(result.code, {
		parser: "babel",
		printWidth: 120,
		tabWidth: 2,
		singleQuote: true,
		semi: true,
		bracketSameLine: true,
		useTabs: false,
		trailingComma: "none"
	});
}

const variableDeclarationCase = `
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
  // babel-plugin-removable-mocks
  const mocks = {
    d1: '11',
    v1: '11'
  };
  round(1.22, 2);

  return round(v);
};
`;

describe("general", function () {
	const variableDeclarationTransform = transform(variableDeclarationCase);

	it("VariableDeclaration transform", () => {
		expect(variableDeclarationTransform).toMatchSnapshot(variableDeclarationTransformSnapshot);
	});
});
