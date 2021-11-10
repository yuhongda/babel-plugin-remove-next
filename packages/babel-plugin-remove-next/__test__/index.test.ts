import { transformSync } from "@babel/core";
import { format } from "prettier";
import presetTypescript from "@babel/preset-typescript";
import babelPluginRemovableMock from "../src/index";
import { resultTransformSnapshot, resultJSXTransformSnapshot } from "./snapshot/transform.snapshot.js";

export function transform(code: string) {
	const result = transformSync(code, {
		retainLines: true,
		presets: [[presetTypescript, { allExtensions: true, isTSX: true }]],
		plugins: [babelPluginRemovableMock],
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
		trailingComma: "none",
	});
}

const variableDeclarationCase = `
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
  // babel-plugin-remove-next
  const mocks = {
    d1: '11',
    v1: '11'
  };
  round(1.22, 2);

  return round(v);
};
`;

const functionDeclarationCase = `
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
  // babel-plugin-remove-next
  function mocksFunc() {
		round(1.22, 2);
	};
  round(1.22, 2);

  return round(v);
};
`;

const callExpressionCase = `
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
  // babel-plugin-remove-next
	round(1.22, 2);
  round(1.22, 2);

  return round(v);
};
`;

const jsxCase = `
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

const SFC_Inner_MyComponent = observer((props) => {
  const [counter, setCounter] = useState(0);

  return <div style={props.styles.blue}>
    
   	{/* babel-plugin-remove-next */}
    <div>will be removed</div>
  
  </div>;
});
`;

describe("general", function () {
	const variableDeclarationTransform = transform(variableDeclarationCase);
	const functionDeclarationTransform = transform(functionDeclarationCase);
	const callExpressionCaseTransform = transform(callExpressionCase);
	const jsxCaseTransform = transform(jsxCase);

	it("VariableDeclaration transform", () => {
		expect(variableDeclarationTransform).toMatchSnapshot(
			resultTransformSnapshot
		);
	});

	it("FunctionDeclaration transform", () => {
		expect(functionDeclarationTransform).toMatchSnapshot(
			resultTransformSnapshot
		);
	});

	it("CallExpression transform", () => {
		expect(callExpressionCaseTransform).toMatchSnapshot(
			resultTransformSnapshot
		);
	});

	it("JSX transform", () => {
		expect(jsxCaseTransform).toMatchSnapshot(
			resultJSXTransformSnapshot
		);
	});
});
