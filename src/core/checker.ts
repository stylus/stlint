import { IRule } from "./types/rule";
import * as rules from "../rules";
import { INode } from "./types/ast/node";
import { Tree } from "./ast";
import { Runner } from "./runner";
import { Linter } from "../linter";
import { Line } from "./line";
import {Rule} from "./rule";

export class Checker {
	readonly rulesListForNodes: IRule[];
	readonly rulesListForLines: IRule[];

	constructor(readonly linter: Linter) {
		const
			rulesNames: string[] = Object.keys(<any>rules),
			rulesList: IRule[] = rulesNames
				.filter(key => (<any>rules)[key].prototype instanceof Rule)
				.map((key: string): IRule => new (<any>rules)[key](linter))
				.filter(rule => rule.state.enabled);

		this.rulesListForLines = rulesList.filter(rule => rule.checkLine);
		this.rulesListForNodes = rulesList.filter(rule => rule.checkNode);
	}

	private check = (root: INode) => {
		const type = root.nodeName;

		this.rulesListForNodes.forEach((rule: IRule) => {
			if (rule.checkNode && rule.isMatchType(type)) {
				rule.checkNode(<INode>root);
			}
		})
	};

	checkRules(ast: Tree, content: string) {
		const runner = new Runner(ast, this.check);
		runner.visit(ast);

		const
			lines: Line[] = [];

		content.split(/\n/)
			.forEach((ln, index) => {
				lines[index] = new Line(ln, index + 1, lines);
			});

		lines
			.forEach(line => {
				this.rulesListForLines.forEach(rule => rule.checkLine && rule.checkLine(line));
			});
	}
}
