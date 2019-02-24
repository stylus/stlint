import Parser = require('stylus/lib/parser');
import utils = require('stylus/lib/utils');
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
			let options = {
				input: '',
				lineno: '',
				column: '',
				filename: ''
			};

			options.input = err.input || err.message;
			err.lineno = options.lineno = err.lineno || parser.lexer.lineno || 0;
			options.column = err.column || parser.lexer.column;

			throw utils.formatException(err, options);
		}
	}
}

