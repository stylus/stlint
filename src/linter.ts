import { Config } from "./config";
import { Reporter } from "./core/reporter";
import { StylusParser } from "./core/parser";
import { Checker } from "./core/checker";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { IReporter } from "./core/types/reporter";

export class Linter {
	path: string;
	content?: string;

	options: Dictionary = {};

	get config(): Config {
		return Config.getInstance(this.options)
	};

	reporter: IReporter;
	parser: StylusParser;
	checker: Checker;

	/**
	 * @param path
	 * @param content
	 * @param options
	 */
	constructor(path: string, content?: string, options: Dictionary = {}) {
		this.path = resolve(path);
		this.content = content;

		this.options = options;
		Config.getInstance(this.options);

		this.reporter = Reporter.getInstance(path, this.config.reporter);

		this.parser = new StylusParser();
		this.checker = new Checker(this);
	}

	/**
	 * Parse styl file and check rules
	 */
	lint() {
		try {
			if (!existsSync(this.path)) {
				throw new Error('File not exists');
			}

			if (!this.content || !this.content.length) {
				this.content = readFileSync(this.path, 'utf8');
			}

			const ast = this.parser.parse(this.content);

			this.checker.checkASTRules(ast, this.content);
			this.checker.checkLineRules(this.content);

		} catch (e) {
			this.reporter.add(e.message, e.lineno, e.startOffset);

			if (this.config.debug) {
				throw e;
			}
		}

		this.reporter.display();
	}
}
