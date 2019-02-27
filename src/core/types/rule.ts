import { INode } from "./ast/node";
import { ILine } from "./line";
import { IState } from "./state";

export interface IRule {
	state: IState;
	nodesFilter: string[] | null;

	checkNode?(node: INode): void;
	checkLine?(line: ILine): void;

	msg(message: string, line: number, start: number, end: number): void;

	isMatchType(type: string): boolean;

	errors: [string, number, number, number][];

	context: Dictionary;
	clearContext: () => void;
}
