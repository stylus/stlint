import { Reporter } from "./core/reporter";
import { StylusParser } from "./core/parser";
import { Checker } from "./core/checker";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { IReporter } from "./core/types/reporter";
import { Rule } from "./core/rule";
import { IConfig } from "./core/types/config";
import { Config } from "./config";

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
		this.reporter.reset();

		this.parser = new StylusParser(this.config.stylusParserOptions);
		this.checker = new Checker(this);
	}

	/**
	 * Parse styl file and check rules
	 */
	lint = async (path: string, content: string | null = null) => {
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

			try {
				const ast = this.parser.parse(content);
				this.checker.checkASTRules(ast);

			} catch (e) {
				this.reporter.add('parse', e.message, e.lineno, e.startOffset);
			}

			this.checker.checkLineRules(content);
		} catch (e) {


			if (this.config.debug) {
				throw e;
			}
		}
	};

	/**
	 * Print all errors or warnings
	 */
	display(exit: boolean = true) {
		this.reporter.display(exit);
	}
}
