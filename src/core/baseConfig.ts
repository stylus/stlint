import { isPlainObject } from "./helpers/isPlainObject";
import { existsSync, readFileSync } from "fs";
import stripJsonComments = require("strip-json-comments");
import { IConfig } from "./types/config";
import { resolve, dirname } from "path";
import { statSync } from "fs";

export class BaseConfig {
	configName: string = '.stlintrc';
	configFile: string = '';
	extraRules: string | string[] = '';

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
	readConfig(configFile: string) {
		if (existsSync(configFile)) {
			try {
				const
					customConfig = JSON.parse(stripJsonComments(readFileSync(configFile, 'utf8')));

				if (customConfig) {
					this.extendsOption(customConfig, this);

					if (this.extraRules) {
						const
							dir = dirname(configFile),
							normaliePath = (extra: string): string => resolve(dir, extra);

						if (Array.isArray(this.extraRules)) {
							this.extraRules = this.extraRules.map(normaliePath);
						} else {
							this.extraRules = normaliePath(this.extraRules);
						}
					}
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

	/**
	 * Load extra config files
	 */
	extendsByPath(pathOrPackage: string) {
		let path: string;

		if (/^\./.test(pathOrPackage)) {
			path = resolve(process.cwd(), pathOrPackage);
		} else {
			path = resolve(process.cwd(), 'node_modules', pathOrPackage)
		}

		const stat = statSync(path);

		if (stat.isFile()) {
			this.readConfig(path);
		} else {
			this.readConfig(resolve(path, this.configName));
		}
	}
}
