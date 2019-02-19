import { IRule } from "./types/rule";
import { IReporter } from "./types/reporter";
import * as rules from "../rules";
import { INode } from "./types/ast/node";
import { Visitor } from "./visitor";

export class Checker {
	readonly rulesList: IRule[];

	constructor(readonly reporter: IReporter) {
		this.rulesList = Object.keys(rules)
			.filter((key) => typeof rules[key] === 'function')
			.map((key: string) => {
				return new rules[key](reporter);
			});
	}

	private check = (root) => {
		const nodeName = root.nodeName;
		this.rulesList.forEach((rule: IRule) => {
			if (rule.isMatchType(nodeName)) {
				rule.process(<INode>root);
			}
		})
	};

	checkRules(ast) {
		const visitor = new Visitor();
		visitor.run(ast, ast, this.check);
	}
}
