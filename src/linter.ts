import { Reporter } from './core/reporter';
import { StylusParser } from './core/parser';
import { Checker } from './core/checker';
import { Preprocessor } from './core/preprocessor';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { IReporter } from './core/types/reporter';
import { Rule } from './core/rule';
import { IConfig } from './core/types/config';
import { Config } from './config';
import watch = require('node-watch');
import { Content } from './core/content';
import { IContent } from './core/types/content';
import { IMessage } from './core/types/message';
const pkg = require('../package.json');

export class Linter {
	options: Dictionary = {};

	config: IConfig;

	reporter: IReporter;
	parser: StylusParser;
	checker: Checker;
	preprocessor!: Preprocessor;

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

		try {
			this.preprocessor = new Preprocessor(this.config.preprocessors);
		} catch (e) {
			this.reporter.add('preprocessorError', e.message, e.lineno || 1, e.startOffset || 1);
		}
	}

	/**
	 * Parse styl file and check rules
	 */
	lint(path: string, str: string | null = null): Content {
		path = resolve(path);

		if (!existsSync(path)) {
			throw new Error('File not exists');
		}

		if (typeof str !== 'string') {
			str = readFileSync(path, 'utf8');
		}

		let content = new Content(str);

		if (this.preprocessor) {
			content = this.preprocessor.apply(content);
		}

		try {

			this.checker.loadAndInitRules();

			this.reporter.setPath(path);

			Rule.clearContext();

			this.fillIgnoredLines(content);

			try {
				const ast = this.parser.parse(content);
				this.checker.checkASTRules(ast, content);

			} catch (e) {
				this.reporter.add('syntaxError', e.message, e.lineno, e.startOffset);
			}

			this.checker.checkLineRules(content);
		} catch (e) {
			if (this.config.debug) {
				throw e;
			}
		} finally {
			if (this.config.grep) {
				this.reporter.filterErrors(this.config.grep);
			}

			if (this.config.fix && str !== null && this.reporter.errors && this.reporter.errors.length) {
				this.fix(path, new Content(str));
			}
		}

		return content;
	}

	protected fillIgnoredLines(content: Content): void {
		let
			ignoreBlock = false;

		content.forEach((line) => {
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
		});
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
	fix(path: string, content: IContent): string {
		let
			diffContent = content;

		const
			fixes: IMessage[] = this.reporter.errors.reduce<IMessage[]>((fxs, error) => {
				error.message.forEach((message: IMessage) => {
					if (message.fix !== null) {
						fxs.push({...message});
					}
				});

				return fxs;
			}, []);

		fixes.sort((a, b) => a.line - b.line);

		diffContent = diffContent.applyFixes(fixes);

		if (diffContent.toString() !== content.toString()) {
			this.saveFix(path, diffContent.toString());
		}

		return diffContent.toString();
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
			(this.config.extraRules ? `Extra Rules:  ${JSON.stringify(this.config.extraRules)}\n` : '') +
			(this.config.extends ? `Extends:  ${JSON.stringify(this.config.extends)}\n` : '') +
			`Rules:  ${JSON.stringify(rules, null, 2)}\n` +
			''
		);
	}
}
