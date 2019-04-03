import { isPlainObject } from './helpers/isPlainObject';
import { existsSync, readFileSync, statSync } from 'fs';
import stripJsonComments = require('strip-json-comments');
import { resolve, dirname } from 'path';
import { IStats } from './types/IStats';
import { mergeArray } from './helpers/mergeArray';

export class BaseConfig {
	configName: string = '.stlintrc';
	configFile: string = '';
	extraRules: string | string[] = '';

	/**
	 * Wrapper for path.statSync
	 * @param path
	 */
	statSync(path: string): IStats {
		return statSync(path);
	}

	/**
	 * Read JSON File
	 */
	readJSONFile(configFile: string): Dictionary {
		if (existsSync(configFile)) {
			try {
				return JSON.parse(stripJsonComments(readFileSync(configFile, 'utf8')));
			} catch {}
		}

		return {};
	}

	/**
	 * Try read config file .stlintrc
	 */
	readConfig(configFile: string): void {
		const
			customConfig = this.readJSONFile(configFile);

		if (customConfig) {
			this.extendsOption(customConfig, this);

			if (this.extraRules) {
				const
					dir = dirname(configFile),
					normalizePath = (extra: string): string => resolve(dir, extra);

				this.extraRules = Array.isArray(this.extraRules) ?
						this.extraRules.map(normalizePath) : normalizePath(this.extraRules);

			}
		}
	}

	/**
	 * Extends default options by some object
	 *
	 * @param from
	 * @param to
	 */
	extendsOption(from: Dictionary, to: Dictionary): Dictionary {
		const result: Dictionary = to;

		Object.keys(from).forEach((key) => {
			if (isPlainObject(from[key]) && isPlainObject(to[key])) {
				result[key] = {...this.extendsOption(from[key], {...to[key]})};

			} else if (Array.isArray(from[key]) && Array.isArray(to[key])) {
				result[key] = mergeArray(to[key], from[key]);

			} else {
				result[key] = from[key];
			}
		});

		return result;
	}

	/**
	 * Load extra config files
	 */
	extendsByPath(pathOrPackage: string): void {
		const
			path: string = /^\./.test(pathOrPackage) ?
					resolve(process.cwd(), pathOrPackage) : resolve(process.cwd(), 'node_modules', pathOrPackage),
			stat = this.statSync(path);

		if (stat.isFile()) {
			this.readConfig(path);
		} else {
			this.readConfig(resolve(path, this.configName));
		}
	}
}
