import { ISNode } from "./snode";

export interface INode {
	lineno: number;
	column: number;

	parent: INode | null;
	block?: INode | null;


	nodeName: string;

	nodes: INode[];
	append<T extends INode>(node: INode, listField: keyof T): void;

	[key: string]: unknown;

	source: ISNode | null;

	value: INode | string | null;
	toString(): string;

	getSibling(next: boolean): null | INode;
	previousSibling(): null | INode;
	nextSibling(): null | INode;
	closest<T extends INode>(parentClass: string): null | T;
}
