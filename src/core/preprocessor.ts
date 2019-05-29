import { Content } from './content';
import _require = require('native-require');

export class Preprocessor {
	private list: Array<(str: string) => string> = [];

	constructor(files: string[]) {
		if (files.length) {
			this.list = files.map((file) => {
					const func = _require(file);

					if (typeof func === 'function') {
						return func;
					}

					return null;
				})
				.filter((f) => f);
		}
	}

	/**
	 * Apply some preprocessors function to content
	 * @param content
	 */
	apply(content: Content): Content {
		if (!this.list.length) {
			return content;
		}

		const str = this.list.reduce((str, func) => func(str), content.content);

		if (typeof str === 'string' && str !== content.content) {
			return new Content(str);
		}

		return content;
	}
}
