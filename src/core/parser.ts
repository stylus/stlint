import { readFileSync } from 'fs';
import Parser = require('stylus/lib/parser');
import utils = require('stylus/lib/utils');

export class StylusParser {
	options = {};
	/**
	 *
	 * @param {string} filename
	 * @returns {*|Node}
	 */
	parse(filename) {
		const content = readFileSync(filename, 'utf8');

		const parser = new Parser(content, this.options);

		try {
			return parser.parse();
		} catch (err) {
			let options = {
				input: '',
				filename: '',
				lineno: '',
				column: '',
			};

			options.input = err.input;
			options.filename = filename;
			err.lineno = options.lineno = err.lineno || parser.lexer.lineno;
			options.column = err.column || parser.lexer.column;

			throw utils.formatException(err, options);
		}
	}
}

