import Parser = require('stylus/lib/parser');
import { Tree } from "./ast";
import { Translator } from "./translator";
import { ISNode } from "./types/ast/snode";
import {splitLines} from "./helpers/splitLines";

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

			const translator = new Translator(stylusAST, splitLines(content));

			return translator.transpile();
		} catch (err) {

			err.lineno = parser.lexer.lineno || err.lineno || 1;
			err.column = parser.lexer.column || err.column || 1;
			err.message = 'Syntax error: ' + err.message + `(${err.lineno},${err.column})`;

			throw err;
		}
	}
}

