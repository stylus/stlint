import { INode } from "./ast/node";
import { Linter } from "../../linter";
import { ILine } from "./line";
import { IState } from "../types/state";

export interface IRule {
	state: IState;
	linter: Linter;
	nodesFilter: string[] | null;

	checkNode?(node: INode): void;
	checkLine?(line: ILine): void;

	msg(message: string, line: number, start: number, end: number): void;

	isMatchType(type: string): boolean;
}
