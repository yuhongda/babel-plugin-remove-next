import * as t from '@babel/types';
import { NodePath } from '@babel/core';

declare const _default: () => {
    name: string;
    visitor: {
        Program: {
            enter(path: NodePath<t.Node>, state: any): void;
            exit(path: NodePath<t.Node>, state: any): void;
        };
    };
};

export { _default as default };
