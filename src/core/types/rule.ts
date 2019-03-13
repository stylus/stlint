import { INode } from "./ast/node";
import { ILine } from "./line";
import { IState } from "./state";

export interface IRule<T extends IState = IState> {
	state: T;
	cache: Dictionary;

	nodesFilter: string[] | null;

	checkNode?(node: INode): void;
	checkLine?(line: ILine, index?: number, lines?: ILine[]): void;

	msg(message: string, line: number, start: number, end: number): void;

	isMatchType(type: string): boolean;

	errors: [string, string, number, number, number][];
	clearErrors(): void;

	context: Dictionary;
	clearContext: () => void;
}
