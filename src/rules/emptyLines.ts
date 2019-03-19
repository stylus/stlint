import { Rule } from '../core/rule';
import { Line } from '../core/line';

/**
 * Check if document has several empty lines
 */
export class EmptyLines extends Rule {
	checkLine(line: Line): void {
		if (line.isEmpty()) {
			const prev = line.prev();

			if (prev && prev.isEmpty()) {
				this.msg('Deny several empty lines', line.lineno);
			}
		}
	}
}
