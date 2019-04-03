import { Rule } from '../core/rule';
import { ILine } from '../core/types/line';

// we only want to check semicolons on properties/values
const ignoreRe = /(^[*#.])|[&>/]|{|}|if|for(?!\w)|else|@block|@media|([}{=,])$/igm;

/**
 * Check that selector properties are sorted accordingly
 */
export class Semicolons extends Rule {
	checkLine(line: ILine): void | boolean {
		if (ignoreRe.test(line.line.trim())) {
			return;
		}

		let
			semicolon;
		const
			index = line.line.indexOf(';');

		if (this.state.conf === 'never' && index !== -1) {
			semicolon = true;
		}

		// for reasons that perplex me, even when the first use
		// of this at the top returns true, sometimes the method
		// still runs, so we add this second ignoreCheck here to catch it
		if (this.state.conf === 'always' && !ignoreRe.test(line.line.trim())) {
			if (index === -1 &&
				line.line.indexOf('}') === -1 &&
				line.line.indexOf('{') === -1) {
				semicolon = false;
			}
		}

		if (this.state.conf === 'never' && semicolon === true) {
			this.msg('unnecessary semicolon found', line.lineno, index + 1, index + 1, '');
		} else if (this.state.conf === 'always' && semicolon === false) {
			this.msg('missing semicolon', line.lineno, line.line.length + 1, line.line.length + 1, ';');
		}

		return semicolon;
	}
}
