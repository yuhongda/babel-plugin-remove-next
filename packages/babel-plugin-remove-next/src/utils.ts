import * as t from "@babel/types";

export const isMock = (node: t.Node) => {
	if (t.isJSXExpressionContainer(node)) {
		if (t.isJSXEmptyExpression(node.expression)) {
			if (
				node.expression.innerComments &&
				node.expression.innerComments.length > 0
			) {
				const foundIt = node.expression.innerComments.find((comment) =>
					comment.value.includes("babel-plugin-remove-next")
				);
				return foundIt;
			}
		} else {
			return false;
		}
	} else {
		const { leadingComments } = node;
		const foundIt = leadingComments?.find((comment) =>
			comment.value.includes("babel-plugin-remove-next")
		);
		return foundIt;
	}
};
