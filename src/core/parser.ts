import Parser = require('stylus/lib/parser');
import { Tree } from "./ast";
import { Translator } from "./translator";
import { ISNode } from "./types/ast/snode";

export class StylusParser {
	/**
	 * @param options Stylus parser options
	 */
	constructor(readonly options: Dictionary = {}) {}

	/**
	 * Parse use native stylus parser into StylusAST and convert it in our AST
	 *
	 * @param {string} content
	 * @returns {Tree}
	 */
	parse(content: string): Tree {
		const parser = new Parser(content, this.options);

		try {
			let stylusAST: ISNode = parser.parse();

			const translator = new Translator(stylusAST);

			return translator.transpile();
		} catch (err) {

			err.lineno = err.lineno || parser.lexer.lineno || 0;
			err.message = 'Syntax error: ' + err.message;
			err.column = parser.lexer.column;

			throw err;
		}
	}
}

