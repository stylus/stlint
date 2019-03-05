import { isPlainObject } from "./core/helpers/isPlainObject";
import { existsSync, readFileSync } from "fs";
import stripJsonComments = require("strip-json-comments");
import { State } from "./core/types/state";

export class Config {
	static FILE_CONFIG_NAME = '.stylusrc';

	private static __instance: Config | null = null;

	static getInstance(options: Dictionary): Config {
		if (!Config.__instance) {
			Config.__instance = new Config(options);
		}

		return Config.__instance;
	}

	protected constructor(options: Dictionary) {
		this.extendsOption(options, this);

		if (!this.config) {
			this.config = process.cwd() + '/' + Config.FILE_CONFIG_NAME;
		}

		if (existsSync(this.config)) {
			try {
				const customConfig = JSON.parse(stripJsonComments(readFileSync(this.config, 'utf8')));
				if (customConfig) {
					this.extendsOption(customConfig, this.defaultConfig);
				}
			} catch {}
		}
	}

	private extendsOption(from: Dictionary, to: Dictionary) {
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

	defaultConfig: Dictionary<State> = {
		quotePref: ['single'],
		semicolons: ['never'],
		colons: ['never'],
		color: 	['uppercase'],
		leadingZero: ['always'],
		useBasis: ['always'],
	};

	config: string = '';

	[key: string]: any;
}
