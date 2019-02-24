import { isPlainObject } from "./core/helpers/isPlainObject";

export class Config {
	private static __instance: Config | null = null;

	static getInstance(options: Dictionary): Config {
		if (!Config.__instance) {
			Config.__instance = new Config(options);
		}

		return Config.__instance;
	}

	protected constructor(options: Dictionary) {
		this.extendsOption(options, this);
	}

	extendsOption(from: Dictionary, to: Dictionary) {
		Object.keys(from).forEach(key => {
			if (isPlainObject(from[key]) && isPlainObject(to[key])) {
				this.extendsOption(from[key], to[key]);
			} else if (Array.isArray(from[key]) && Array.isArray(to[key])) {
				to[key] = to[key].map((val: any, index: number) =>
					(from[key][index] !== undefined) ? from[key][index] : to[key][index]);
			} else {
				to[key] = from[key];
			}
		});
	}

	debug: boolean = false;
	reporter: string = 'default';

	defaultConfig: Dictionary = {
		colons: ['never'],
		color: 	['uppercase'],
		leadingZero: ['always'],
	};

	[key: string]: any;
}
