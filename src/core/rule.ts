import { IReporter } from "./types/reporter";
import { IRule, NodeType } from "./types/rule";
import { INode } from "./types/ast/node";

export abstract class Rule implements IRule {
	nodesFilter: NodeType[] | null = null;
	reporter: IReporter;
	constructor(reporter: IReporter) {
		this.reporter = reporter;
	}

	abstract process(node: INode): void;

	msg(message: string, line: number, start: number = 0, end: number = 0) {
		this.reporter.add(message, line, start, end);
	}

	isMatchType(type: string): boolean {
		return !this.nodesFilter || this.nodesFilter.indexOf(<NodeType>type) !== -1;
	}
}
