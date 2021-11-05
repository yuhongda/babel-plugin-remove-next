import * as t from "@babel/types";

export const isMock = (node: t.Node) => {
	const { leadingComments } = node;
	const foundIt = leadingComments?.find((comment) =>
		comment.value.includes("babel-plugin-removable-mocks")
	);
	return foundIt;
};
