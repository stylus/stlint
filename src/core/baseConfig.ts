import { isPlainObject } from "./helpers/isPlainObject";
import { existsSync, readFileSync } from "fs";
import stripJsonComments = require("strip-json-comments");
import { IConfig } from "./types/config";

export class BaseConfig {
	configName: string = '.stlintrc';
	configFile: string = '';

	private static __instance: IConfig | null = null;

	/**
	 * Use this becouse of tests
	 * @param options
	 */
	static getInstance(options: Dictionary): IConfig {
		if (!this.__instance) {
			this.__instance = new (<any>this)(options);
		}

		return <IConfig>this.__instance;
	}

	/**
	 * Try read config file .stlintrc
	 */
	readCustomConfig() {
		if (!this.configFile) {
			this.configFile = process.cwd() + '/' + this.configName;
		}

		if (existsSync(this.configFile)) {
			try {
				const
					customConfig = JSON.parse(stripJsonComments(readFileSync(this.configFile, 'utf8')));

				if (customConfig) {
					this.extendsOption(customConfig, this);
					this.extendsOption(customConfig, (<any>this).rules);
				}
			} catch {}
		}
	}

	/**
	 * Extends default options by some object
	 *
	 * @param from
	 * @param to
	 */
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
}
