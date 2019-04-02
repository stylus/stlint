import { ISNode } from './snode';
import { ILine } from '../line';
import { IContent } from '../content';

export interface INode {
	[key: string]: unknown;
	lineno: number;
	column: number;

	content: IContent | null;

	/**
	 * Get line object
	 */
	line: ILine | null;

	parent: INode | null;
	block?: INode | null;

	nodeName: string;

	nodes: INode[];

	source: ISNode | null;

	value: INode | string | null;
	append<T extends INode>(node: INode, listField?: keyof T): void;
	toString(): string;

	getSibling(next?: boolean): null | INode;
	getChild(findClass?: string, last?: boolean): null | INode;
	previousSibling(): null | INode;
	nextSibling(): null | INode;

	closest(parentClass: string): null | INode;
	lastChild(findClass?: string): null | INode;
	firstChild(findClass?: string): null | INode;
}
