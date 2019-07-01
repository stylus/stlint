import Parser = require('stylus/lib/parser');
import { Tree } from './ast/index';
import { Translator } from './translator';
import { ISNode } from './types/ast/snode';
import { Content } from './content';

export class StylusParser {
	/**
	 * @param options Stylus parser options
	 */
	constructor(readonly options: Dictionary = {}) {
	}

	/**
	 * Parse use native stylus parser into StylusAST and convert it in our AST
	 *
	 * @param {string} content
	 * @returns {Tree}
	 */
	parse(content: Content): Tree {
		const
			parser = new Parser(content.toString(), this.options);

		try {
			const
				stylusAST: ISNode = parser.parse({
					resolver: (path: string) => {
						console.log(path);
					}
				});

			const
				translator = new Translator(stylusAST, content);

			return translator.transpile();
		} catch (err) {

			err.lineno = parser.lexer.lineno || err.lineno || 1;
			err.column = parser.lexer.column || err.column || 1;
			err.message = `Syntax error: ${err.message} (${err.lineno},${err.column})`;

			throw err;
		}
	}
}
