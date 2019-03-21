import { Rule } from '../core/rule';
import { ILine } from '../core/types/line';

const validJSON = require('../data/valid.json');

/**
 * Use/Do not use colons after property
 */
export class Colons extends Rule {
	checkLine(line: ILine): void | boolean {
		if (this.context.inHash) {
			return;
		}

		let colon = this.state.conf === 'always';
		let hasPseudo = false;
		let hasScope = false;
		const arr = line.line.split(/\s/);

		if (this.state.conf === 'always' &&
			arr.length > 1 &&
			arr[0].indexOf(':') === -1 &&
			arr[0].indexOf(',') === -1) {
			colon = false;
		} else if (this.state.conf === 'never' && line.line.indexOf(':') !== -1) {
			// check for pseudo selector
			hasPseudo = validJSON.pseudo.some((val: string) => line.line.indexOf(val) !== -1);

			// check for scope selector
			hasScope = validJSON.scope.some((val: string) => line.line.indexOf(val) !== -1);

			const
				index = line.line.indexOf(':'),
				url = /url\(.*?\)/i.exec(line.line);

			if (url && url.index < index && url[0].length + url.index > index) {
				colon = false;
			} else {
				if (!hasPseudo && !hasScope) {
					colon = true;
				}
			}
		}

		if (this.state.conf === 'always' && colon === false) {
			this.msg('missing colon between property and value', line.lineno, arr[0].length);
		} else if (this.state.conf === 'never' && colon === true) {
			const index = line.line.indexOf(':');
			this.msg('unnecessary colon found', line.lineno, index + 1);
		}

		return colon;
	}
}
