import { Reporter } from './core/reporter';
import { StylusParser } from './core/parser';
import { Checker } from './core/checker';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { IReporter } from './core/types/reporter';
import { Rule } from './core/rule';
import { IConfig } from './core/types/config';
import { Config } from './config';
import watch from 'node-watch';
import { Line } from './core/line';
import { splitLines } from './core/helpers/splitLines';

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
		this.config = new Config(this.options);

		this.reporter = Reporter.getInstance(this.config.reporter, this.config.reportOptions);

		this.parser = new StylusParser(this.config.stylusParserOptions);
		this.checker = new Checker(this);
	}

	/**
	 * Parse styl file and check rules
	 */
	lint = (path: string, content: string | null = null) => {
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

			let ignoreBlock: boolean = false, line: Line;

			for (let index = 1; index < lines.length; index += 1) {
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
		}
	};

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
		if (this.config.grep) {
			this.reporter.filterErrors(this.config.grep);
		}

		this.reporter.display(exit);
	}
}
