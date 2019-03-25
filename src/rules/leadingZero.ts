import { Rule } from '../core/rule';
import { ILine } from '../core/types/line';

const decimalRe = /[^\d+](0+\.\d+)|[\s,(:](\.\d+)/i;
const leadZeroRe = /([^\d+])(0+\.\d+)/;
const nonZeroRe = /([\s,(:])(\.\d+)/;

/**
 * Check for leading 0 on numbers ( 0.5 )
 */
export class LeadingZero extends Rule {
	checkLine(line: ILine): void | boolean {
		if (!decimalRe.test(line.line)) {
			return;
		}

		const leadZeroFound = leadZeroRe.exec(line.line);
		const leadZeroMissing = nonZeroRe.exec(line.line);

		if (this.state.conf === 'always' && leadZeroMissing) {
			this.msg(
				'leading zeros for decimal points are required',
				line.lineno,
				leadZeroMissing.index + leadZeroMissing[1].length + 1,
				leadZeroMissing.index + leadZeroMissing[1].length + 1,
				'0.'
			);
		} else if (this.state.conf === 'never' && leadZeroFound) {
			this.msg(
				'leading zeros for decimal points are unnecessary',
				line.lineno,
				leadZeroFound.index + leadZeroFound[1].length + 1,
				leadZeroFound.index + leadZeroFound[1].length + 1,
				''
			);
		}

		return Boolean(leadZeroFound);
	}
}
