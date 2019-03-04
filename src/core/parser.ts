import Parser = require('stylus-pro/lib/parser');
import { Tree } from "./ast";
import { Translator } from "./translator";
import { ISNode } from "./types/ast/snode";

export class StylusParser {
	options = {};
	/**
	 * @param {string} [content]
	 * @returns {Tree}
	 */
	parse(content?: string): Tree {
		const parser = new Parser(content, this.options);

		try {
			let stylusAST: ISNode = parser.parse();

			const translitor = new Translator(stylusAST);

			return translitor.transpile();
		} catch (err) {

			err.lineno = err.lineno || parser.lexer.lineno || 0;
			err.message = 'Syntax error: ' + err.message;
			err.column = parser.lexer.column;

			throw err;
		}
	}
}

