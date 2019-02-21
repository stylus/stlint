import { IReporter } from "./reporter";
import { INode } from "./ast/node";

export interface ICheck {
	reporter: IReporter;
	nodesFilter: string[] | null;

	process(node: INode): void;
	msg(message: string, line: number, start: number, end: number): void;

	isMatchType(type: string): boolean;
}
