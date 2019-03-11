import { IRule } from "./types/rule";
import * as rules from "../rules";
import { INode } from "./types/ast/node";
import { Tree } from "./ast";
import { Runner } from "./runner";
import { Linter } from "../linter";
import { Line } from "./line";
import { Rule } from "./rule";
import { IReporter } from "./types/reporter";
import { lcfirst } from "./helpers/lcfirst";

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
				.map((key: string): IRule => new (<any>rulesConstructors)[key](linter.config.rules[lcfirst(key)]))
				.filter(rule => rule.state.enabled);

		this.rulesListForLines = this.rulesList.filter(rule => rule.checkLine);
		this.rulesListForNodes = this.rulesList.filter(rule => rule.checkNode);
	}

	/**
	 * Check whole AST
	 *
	 * @param ast
	 */
	checkASTRules(ast: Tree) {
		try {
			const runner = new Runner(ast, this.check);
			runner.visit(ast, null);

		} catch (e) {
			this.linter.reporter.add('parser', e.message, e.lineno || 1, 0);

		} finally {
			this.afterCheck();
		}
	}

	private check = (root: INode) => {
		const type = root.nodeName;

		this.rulesListForNodes.forEach((rule: IRule) => {
			if (rule.checkNode && rule.isMatchType(type)) {
				rule.checkNode(<INode>root);
			}
		})
	};

	/**
	 * Check line by line
	 * @param content
	 */
	checkLineRules(content: string) {
		try {
			const
				lines: Line[] = [];

			content.split(/\n/)
				.forEach((ln, index) => {
					lines[index] = new Line(ln, index + 1, lines);
				});

			lines
				.forEach((line, index) => {
					Rule.beforeCheckLine(line);
					this.rulesListForLines.forEach(rule => rule.checkLine && rule.checkLine(line, index, lines));
				});

		} catch (e) {
			this.linter.reporter.add('Line', e.message, e.lineno || 1, 0);

		} finally {
			this.afterCheck();
		}
	}

	/**
	 * After checking put errors in reporter
	 */
	private afterCheck() {
		const reporter: IReporter = this.linter.reporter;

		this.rulesList.forEach(rule => {
			rule.errors.forEach(msg => reporter.add.apply(reporter, msg));
			rule.errors.length = 0;
		});

		reporter.fillResponse();
	}
}
