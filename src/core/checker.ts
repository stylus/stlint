import { IRule } from './types/rule';
import * as rules from '../rules/index';
import { INode } from './types/ast/node';
import { Tree } from './ast/index';
import { Runner } from './runner';
import { Linter } from '../linter';
import { Line } from './line';
import { Rule } from './rule';
import { IReporter } from './types/reporter';
import { lcfirst } from './helpers/lcfirst';
import { statSync, readdirSync } from 'fs';
import { resolve } from 'path';
import _require = require('native-require');
import { IContent } from './types/content';
import { IState } from './types/state';

export class Checker {
	rulesListForNodes: IRule[] = [];
	rulesListForLines: IRule[] = [];
	rulesList: IRule[] = [];

	constructor(readonly linter: Linter) {
	}

	/**
	 * Load and init rules (and external rules too)
	 */
	loadAndInitRules(): void {

		this.rulesList = this.initRules(<any>rules);

		if (this.linter.config.extraRules) {
			const extraRules = this.loadRules(this.linter.config.extraRules);
			this.rulesList = this.rulesList.concat(this.initRules(extraRules));
		}

		this.rulesListForLines = this.rulesList.filter((rule) => rule.checkLine);
		this.rulesListForNodes = this.rulesList.filter((rule) => rule.checkNode);
	}

	/**
	 * Create instance od all rules all rules
	 * @param rulesConstructors
	 */
	private initRules(rulesConstructors: Dictionary<typeof Rule>): IRule[] {
		const
			rulesNames: string[] = Object.keys(rulesConstructors),
			config = this.linter.config;

		return rulesNames
			.filter((key) => typeof rulesConstructors[key] === 'function')
			.map((key: string): IRule => {
				let options = config.rules[lcfirst(key)];

				if (options === true && config.defaultRules[lcfirst(key)]) {
					options = config.defaultRules[lcfirst(key)];
				}

				if (!(rulesConstructors[key].prototype instanceof Rule)) {
					rulesConstructors[key].prototype = new Rule(<IState>options);
					rulesConstructors[key].prototype.constructor = rulesConstructors[key];
				}

				const rule: IRule = new (<any>rulesConstructors)[key](options);

				rule.setConfig(config);

				return rule;
			})
			.filter((rule) => rule.state.enabled);
	}

	/**
	 * Load rules from folder
	 */
	private loadRules(path: string | string[]): Dictionary<typeof Rule> {
		let results: Dictionary<typeof Rule> = {};

		if (Array.isArray(path)) {
			path.map(this.loadRules.bind(this)).forEach((rules) => {
				results = {...results, ...rules};
			});

			return results;
		}

		const stat = statSync(path);

		if (stat.isFile()) {
			results = {...results, ...this.requireRule(path)};
		} else if (stat.isDirectory()) {
			readdirSync(path).forEach((file) => {
				// @ts-ignore
				results = {...results, ...this.requireRule(resolve(path, file))};
			});
		}

		return results;
	}

	/**
	 * Load one rule or several rules
	 * @param path
	 */
	private requireRule(path: string): Dictionary<typeof Rule> {

		if (/\.js$/.test(path)) {
			try {
				const rule = _require(`${path}`);

				if (typeof rule === 'function') {
					return {
						[rule.name]: rule
					};
				} else {
					return {
						...rule
					};
				}
			} catch (e) {
				this.linter.reporter.add('JS', e.message, 1, 1);
			}
		}

		return {};
	}

	/**
	 * Check whole AST
	 *
	 * @param ast
	 * @param content
	 */
	checkASTRules(ast: Tree, content: IContent): void {
		try {
			const runner = new Runner(ast, this.check.bind(this, content));
			runner.visit(ast, null);

		} catch (e) {
			if (this.linter.config.debug) {
				throw e;
			}

			this.linter.reporter.add('astRulesError', e.message, e.lineno || 1, 0);

		} finally {
			this.afterCheck();
		}
	}

	/**
	 * Check line by line
	 * @param content
	 */
	checkLineRules(content: IContent): void {
		try {
			content.forEach((line, index) => {
				if (index && !line.isIgnored) {
					Rule.beforeCheckLine(line);
					this.rulesListForLines.forEach((rule) => rule.checkLine && rule.checkLine(line, index, content));
				}
			});

		} catch (e) {
			this.linter.reporter.add('Line', e.message, e.lineno || 1, 0);

		} finally {
			this.afterCheck();
		}
	}

	private check(content: IContent, node: INode): void {
		const type = node.nodeName;

		Rule.beforeCheckNode(node);

		this.rulesListForNodes.forEach((rule: IRule) => {
			const line = node.line;

			if (line && !line.isIgnored && rule.checkNode && rule.isMatchType(type)) {
				rule.checkNode(<INode>node, content);
			}
		});
	}

	/**
	 * After checking put errors in reporter
	 */
	private afterCheck(): void {
		const reporter: IReporter = this.linter.reporter;

		this.rulesList.forEach((rule) => {
			rule.errors.forEach((msg) => reporter.add.apply(reporter, msg));
			rule.clearErrors();
		});

		reporter.fillResponse();
	}
}
