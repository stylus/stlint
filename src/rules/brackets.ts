import { Rule } from '../core/rule';
import { ILine } from '../core/types/line';
import { splitAndStrip, checkPrefix } from '../core/helpers/index';

const
	ignoreRe = /\(.*\)|@extend|\(|if|for(?!\w)|else|return|@block|@media|@import|@require|,$/,
	stripRe = /(?=\S)\[\S+]|([.#])\w+/,
	equalsRe = /( =|\?=|\+=|-=)+/,
	validJSON: ValidCSS = require('../data/valid.json');

/**
 * Check for brackets
 */
export class Brackets extends Rule {
	checkLine(line: ILine): void | boolean {
		if (this.context.inHash || line.isEmpty() || equalsRe.test(line.line) || ignoreRe.test(line.line)) {
			return;
		}

		let
			arr = ['hint'],
			isCSS = false,
			isMixin = false,
			bracket: false | number = false;

		if (this.state.conf === 'never') {
			if (line.line.indexOf('{') !== -1 && line.line.indexOf('=') === -1 && line.line.indexOf('}') === -1) {
				bracket = line.line.indexOf('{');
			} else if (line.line.indexOf('{') === -1 && line.line.indexOf('}') !== -1) {
				bracket = line.line.indexOf('}');
			}

		} else if (this.state.conf === 'always') {

			arr = splitAndStrip(new RegExp(/[\s\t,:]/), line.line);

			if (typeof arr[0] !== 'undefined') {
				arr[0] = arr[0].replace(stripRe, '').trim();

				isCSS = validJSON.css.some((css) => arr[0] === css || checkPrefix(arr[0], css, validJSON));

				isMixin = this.config.customProperties.some((mixin) => arr[0] === mixin);
			}

			// basically, we don't care about properties like margin or padding
			if (line.line.trim().indexOf('}') !== -1 || isCSS || isMixin) {
				return;
			}

			if (line.line.indexOf('{') !== -1) {
				bracket = line.line.indexOf('{');
				this.context.openBracket = true;
			} else if (line.line.indexOf('}') !== -1 && this.context.openBracket) {
				bracket = line.line.indexOf('}');
				this.context.openBracket = false;
			}
		}

		if (this.state.conf === 'never' && bracket !== false) {
			this.msg('unnecessary bracket', line.lineno, bracket + 1, line.lineno, '');

		} else if (this.state.conf === 'always' && bracket === false) {
			this.msg('always use brackets when defining selectors',
				line.lineno,
				line.line.length,
				line.lineno,
				line.line[line.line.length - 1] + (this.context.openBracket ? '}' : ' {')
			);

			if (!this.context.openBracket) {
				this.context.openBracket = true;
			}
		}

		if (this.state.conf === 'always' && line.isLast() && this.context.openBracket) {
			this.msg('need close bracket',
				line.lineno,
				line.line.length,
				line.lineno,
				line.line[line.line.length - 1] + '\n}'
			);
		}

		return bracket !== false;
	}
}
