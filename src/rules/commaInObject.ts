import { Rule } from "../core/rule";
import { ILine } from "../core/types/line";

const
	reg = /(,)(\s)*$/,
	keyValue = /:/,
	hashEnd = /\}/;

export class CommaInObject extends Rule {
	checkLine(line: ILine): void | boolean {
		if (!this.context.inHash) {
			return;
		}

		let hasComma = false;
		const match = reg.exec(line.line);

		if (match) {
			hasComma = true;
		}

		if (hasComma && this.state.conf === 'never') {
			this.msg('Remove comma from object hash', line.lineno, match ? match.index + 1 : 0);
		} else if (!hasComma && this.state.conf === 'always') {
			const next = line.next();

			if (keyValue.test(line.line) && !hashEnd.test(line.line) && next && !hashEnd.test(next.line)) {
				this.msg('Add comma after object key: value', line.lineno, line.line.length - 2);
			}
		}

		return hasComma;
	}
}
