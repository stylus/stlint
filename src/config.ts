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

	debug: boolean = false;

	defaultConfig: Dictionary = {
		colons: ['never'],
		color: 	['uppercase'],
		leadingZero: ['always'],
	};

	[key: string]: any;
}
