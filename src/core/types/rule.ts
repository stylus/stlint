import { IReporter } from "./reporter";
import { INode } from "./ast/node";

export type NodeType  = 'property' | 'import' | 'rgba' | string;

export interface IRule {
	reporter: IReporter;
	nodesFilter: NodeType[] | null;

	process(node: INode): void;
	msg(message: string, line: number, start: number, end: number): void;

	isMatchType(type: string): boolean;
}
