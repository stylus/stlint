export interface INode {
	lineno: number;
	column: number;

	parent: INode | null;
	block?: INode | null;
	nodeName: string;

	nodes: INode[];
	append<T extends INode>(node: INode, listField: keyof T): void;

	[key: string]: unknown;
}
