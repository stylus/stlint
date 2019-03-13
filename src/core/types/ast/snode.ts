export interface ISNode {
	lineno: number;
	column: number;

	block?: ISNode | null;
	nodeName: string;
	path?: string;
	name?: string;
	string?: string;
	expr?: ISNode;
	val?: ISNode;
	left?: ISNode;
	right?: ISNode;
	type?: ISNode;
	cond?: ISNode;
	predicate?: string;

	nodes: ISNode[];
	params?: ISNode;
	args?: ISNode;
	vals?: Dictionary<ISNode>;
	keys?: Dictionary<ISNode>;

	[key: string]: unknown;
	toString(): string;
}
