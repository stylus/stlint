import _require = require('native-require');
import { defaultAutocomplete } from '../autocomplete/index';
import { AutocompleteFunction, Suggestions } from './types/autocomplete';
import { IConfig } from './types/config';

export class Autocomplete {
	private list: AutocompleteFunction[] = [];

	constructor(readonly config: IConfig) {
		if (config.autocompletes.length) {
			this.list = config.autocompletes.map((file) => {
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
				res.concat(func.call(this, search, offset, lineOffset)), [] as Suggestions
		);
	}
}
