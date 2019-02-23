import { Rule } from "../core/rule";
import { Line } from "../core/line";

const validJSON = require( '../data/valid.json' );

// we only want to check colons on properties/values
const ignoreRe = /(^[&$=#>.]|\.[a-zA-Z]|#[a-zA-Z]| \+ | , | = | ~ | > | &| {|}|\(|if|for(?!\w)|else|return|@block|@media|@import|@extend|@require|,$)/m;


/**
 * @description check for colons
 * @param {string} [line] curr line being linted
 * @returns {boolean} true if colon found, false if not
 */
export class Colons extends Rule {
	checkLine(line: Line) {
		if (ignoreRe.test(line.line)) {
			return
		}

		let colon;
		let hasPseudo = false;
		let hasScope = false;
		let arr = line.line.split(/\s/);

		if (this.state.conf === 'always' &&
			arr.length > 1 &&
			arr[0].indexOf( ':' ) === -1 &&
			arr[0].indexOf( ',' ) === -1 ) {
			colon = false
		}
		// : is allowed in hashes
		else if (this.state.conf === 'never' && line.line.indexOf( ':' ) !== -1) {

			// check for pseudo selector
			hasPseudo = validJSON.pseudo.some((val: string) => line.line.indexOf( val ) !== -1);

			// check for scope selector
			hasScope = validJSON.scope.some( (val: string) => line.line.indexOf( val ) !== -1);

			if ( !hasPseudo && !hasScope ) {
				colon = true
			}
		}

		if ( this.state.conf === 'always' && colon === false ) {
			this.msg( 'missing colon between property and value', line.lineno, arr[0].length);
		}
		else if ( this.state.conf === 'never' && colon === true ) {
			const index = line.line.indexOf( ':' );
			this.msg( 'unnecessary colon found', line.lineno, index);
		}

		return colon
	}
}
