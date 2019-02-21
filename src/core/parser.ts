import { readFileSync } from 'fs';
import Parser = require('stylus/lib/parser');
import Evaluator = require('stylus/lib/visitor/evaluator');
import Normalizer = require('stylus/lib/visitor/normalizer');
import utils = require('stylus/lib/utils');
import { Tree } from "./ast";
import {Translator} from "./translator";

export class StylusParser {
	options = {};
	/**
	 * @param {string} filename
	 * @param {string} [content]
	 * @returns {Tree}
	 */
	parse(filename: string, content?: string): Tree {
		if (!content || !content.length) {
			content = readFileSync(filename, 'utf8');
		}

		const parser = new Parser(content, this.options);

		try {
			let stylusAST = parser.parse();
			// evaluate
			const evaluator = new Evaluator(stylusAST, this.options);

			stylusAST = evaluator.evaluate();

			// normalize
			const normalizer = new Normalizer(stylusAST, this.options);
			stylusAST = normalizer.normalize();

			const translitor = new Translator(stylusAST);
			return translitor.transpile();

		} catch (err) {
			let options = {
				input: '',
				filename: '',
				lineno: '',
				column: '',
			};

			options.input = err.input;
			options.filename = filename;
			err.lineno = options.lineno = err.lineno || parser.lexer.lineno || 0;
			options.column = err.column || parser.lexer.column;

			throw utils.formatException(err, options);
		}
	}
}

