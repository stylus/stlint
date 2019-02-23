import { isPlainObject } from "./core/helpers/isPlainObject";

export class Config {
	constructor(options: Dictionary) {
		Object.keys(options).forEach(key => {
			if (isPlainObject(options[key]) && this[key]) {
				this[key] = {...this[key], ...options[key]};
			} else if (Array.isArray(options[key]) && this[key]) {
				this[key] = [...this[key], ...options[key]];
			} else {
				this[key] = options[key];
			}
		});
	}

	debug: boolean = true;

	defaultConfig: Dictionary = {
		colons: ['never'],
		color: 	['uppercase'],
	};

	[key: string]: any;
}
