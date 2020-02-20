import _require = require('native-require');
import { defaultAutocomplete } from '../autocomplete/index';
import { AutocompleteFunction, Suggestions } from './types/autocomplete';

export class Autocomplete {
	private list: AutocompleteFunction[] = [];

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

		this.list.push(defaultAutocomplete);
	}

	/**
	 * Apply some preprocessors function to content
	 *
	 * @param search
	 * @param offset
	 * @param lineOffset
	 */
	getItems(search: string, offset: number, lineOffset: number): Suggestions {
		if (!this.list.length) {
			return [];
		}

		return this.list.reduce(
			(res, func) =>
				res.concat(func(search, offset, lineOffset)), [] as Suggestions
		);
	}
}
