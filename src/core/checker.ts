import { IRule } from "./types/rule";
import * as rules from "../rules";
import { INode } from "./types/ast/node";
import { Tree } from "./ast";
import { Runner } from "./runner";
import { Linter } from "../linter";
import { Line } from "./line";
import { Rule } from "./rule";
import { IReporter } from "./types/reporter";
import {lcfirst} from "./helpers/lcfirst";

export class Checker {
	readonly rulesListForNodes: IRule[];
	readonly rulesListForLines: IRule[];
	readonly rulesList: IRule[];

	constructor(readonly linter: Linter) {
		const
			rulesConstructors: Dictionary<Function> = <any>rules,
			rulesNames: string[] = Object.keys(rulesConstructors);

		this.rulesList = rulesNames
				.filter(key => rulesConstructors[key].prototype instanceof Rule)
				.map((key: string): IRule => new (<any>rulesConstructors)[key](linter.config.defaultConfig[lcfirst(key)]))
				.filter(rule => rule.state.enabled);

		this.rulesListForLines = this.rulesList.filter(rule => rule.checkLine);
		this.rulesListForNodes = this.rulesList.filter(rule => rule.checkNode);
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
		try {
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
		} catch (e) {
			this.linter.reporter.add(e.message, e.lineno || 1, 0);

		} finally {
			const rep: IReporter = this.linter.reporter;

			this.rulesList.forEach(rule => {
				rule.errors.forEach(msg => rep.add.apply(rep, msg));
				rule.errors.length = 0;
			});
		}
	}
}
