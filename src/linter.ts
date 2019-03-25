import { Reporter } from './core/reporter';
import { StylusParser } from './core/parser';
import { Checker } from './core/checker';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { IReporter } from './core/types/reporter';
import { Rule } from './core/rule';
import { IConfig } from './core/types/config';
import { Config } from './config';
import watch from 'node-watch';
import { Line } from './core/line';
import { splitLines } from './core/helpers/splitLines';
import { IFix, IMessage } from './core/types/message';
import { calcPosition } from './core/helpers/calcPosition';
const pkg = require('../package.json');

export class Linter {
	options: Dictionary = {};

	config: IConfig;

	reporter: IReporter;
	parser: StylusParser;
	checker: Checker;

	/**
	 * @param options
	 */
	constructor(options: Dictionary = {}) {
		this.options = options;

		if (options.config && typeof options.config === 'string') {
			options.configFile = options.config;
		}

		this.config = new Config(this.options);

		this.reporter = Reporter.getInstance(this.config.reporter, this.config.reportOptions);

		this.parser = new StylusParser(this.config.stylusParserOptions);
		this.checker = new Checker(this);
	}

	/**
	 * Parse styl file and check rules
	 */
	lint(path: string, content: string | null = null): void {
		this.reporter.reset();

		path = resolve(path);

		try {
			if (!existsSync(path)) {
				throw new Error('File not exists');
			}

			if (typeof content !== 'string') {
				content = readFileSync(path, 'utf8');
			}

			this.checker.loadAndInitRules();

			this.reporter.setPath(path);

			Rule.clearContext();

			const
				lines: Line[] = splitLines(content);

			this.fillIgnoredLines(lines);

			try {
				const ast = this.parser.parse(content);
				this.checker.checkASTRules(ast, lines);

			} catch (e) {
				this.reporter.add('syntaxError', e.message, e.lineno, e.startOffset);
			}

			this.checker.checkLineRules(content, lines);
		} catch (e) {

			if (this.config.debug) {
				throw e;
			}
		} finally {
			if (this.config.grep) {
				this.reporter.filterErrors(this.config.grep);
			}

			if (this.config.fix && content !== null && this.reporter.errors && this.reporter.errors.length) {
				this.fix(path, content);
			}
		}
	}

	protected fillIgnoredLines(lines: Line[]): void {
		let
			ignoreBlock = false,
			line: Line,
			index;

		for (index = 1; index < lines.length; index += 1) {
			line = lines[index];

			if (ignoreBlock) {
				line.isIgnored = true;
				if (/@stlint-enable/.test(line.line)) {
					ignoreBlock = false;
				}
			} else if (/@stlint-ignore/.test(line.line)) {
				line.isIgnored = true;
				const next = line.next();

				if (next) {
					next.isIgnored = true;
				}
			} else if (/@stlint-disable/.test(line.line)) {
				ignoreBlock = true;
			}
		}
	}

	/**
	 * Watch to some directory or file
	 *
	 * @param path
	 * @param callback
	 */
	watch(path: string, callback: () => void): void {
		watch(path, {
			encoding : 'utf-8',
			recursive: true,
			filter: /\.styl$/
		}, callback);
	}

	/**
	 * Print all errors or warnings
	 */
	display(exit: boolean = true): void {
		this.reporter.display(exit);
	}

	/**
	 * Try fix some errors
	 */
	fix(path: string, content: string): string {
		let diffContent = content;

		this.reporter.errors.forEach((error) => {
			error.message.forEach((message) => {
				if (message.fix !== null) {
					diffContent = this.applyFix(message.fix, message, diffContent);
				}
			});
		});

		if (diffContent !== content) {
			this.saveFix(path, diffContent);
		}

		return diffContent;
	}

	protected applyFix(fix: IFix, message: IMessage, content: string): string {
		const
			start = calcPosition(message.line, message.start, content),
			end = calcPosition(message.endline, message.end, content);

		return content.substr(0, start) + fix.replace + content.substr(end + 1);
	}

	saveFix(path: string, content: string): void {
		writeFileSync(path, content);
	}

	info(): void {
		const
			rules = Object.keys(this.config.rules)
				.filter((ruleKey) => ruleKey.match(this.config.grep))
				.reduce((rls, ruleKey) => {
					rls[ruleKey] = this.config.rules[ruleKey];
					return rls;
				}, <Dictionary>{});

		console.log(
			`Version: ${pkg.version}\n` +
			`Config:  ${this.config.configFile}\n` +
			(this.config.extraRules ? `Extra Rules:  ${JSON.stringify(this.config.extraRules)}\\n` : '') +
			(this.config.extends ? `Extends:  ${JSON.stringify(this.config.extends)}\\n` : '') +
			`Rules:  ${JSON.stringify(rules, null, 2)}\n` +
			''
		);
	}
}
