import { IReporter } from "./types/reporter";
import { ICheck } from "./types/check";
import { INode } from "./types/ast/node";

export abstract class Check implements ICheck {
	nodesFilter: string[] | null = null;
	reporter: IReporter;
	constructor(reporter: IReporter) {
		this.reporter = reporter;
	}

	abstract process(node: INode): void;

	msg(message: string, line: number, start: number = 0, end: number = 0) {
		this.reporter.add(message, line, start, end);
	}

	isMatchType(type: string): boolean {
		return !this.nodesFilter || this.nodesFilter.includes(type);
	}
}
