import { Rule } from "../core/rule";
import { Line } from "../core/line";

const decimalRe = /[^\d+](0+\.\d+)|[\s,(](\.\d+)/i;
const leadZeroRe = /[^\d+](0+\.\d+)/;
const nonZeroRe = /[\s,(](\.\d+)/;

/**
 * @description check for leading 0 on numbers ( 0.5 )
 * @param {string} [line] curr line being linted
 * @returns {boolean|undefined} true if mixed, false if not
 */
export class LeadingZero extends Rule {
	checkLine(line: Line) {
		if (!decimalRe.test(line.line)) {
			return
		}

		const leadZeroFound = leadZeroRe.exec(line.line);
		const leadZeroMissing = nonZeroRe.exec(line.line);

		if (this.state.conf === 'always' && leadZeroMissing) {
			this.msg('leading zeros for decimal points are required', line.lineno, leadZeroMissing.index);
		} else if (this.state.conf === 'never' && leadZeroFound) {
			this.msg('leading zeros for decimal points are unnecessary', line.lineno, leadZeroFound.index);
		}

		return leadZeroFound
	}
}
