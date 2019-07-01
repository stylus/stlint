import { isPlainObject } from './helpers/isPlainObject';
import { existsSync, readFileSync, statSync } from 'fs';
import stripJsonComments = require('strip-json-comments');
import { resolve, dirname, extname } from 'path';
import { IStats } from './types/IStats';
import { mergeArray } from './helpers/mergeArray';
import _require = require('native-require');

export class BaseConfig {
	configName: string = '.stlintrc';
	configFile: string = '';
	extraRules: string | string[] = '';
	preprocessors: string[] = [];

	/**
	 * Wrapper for path.statSync
	 * @param path
	 */
	statSync(path: string): IStats {
		return statSync(path);
	}

	/**
	 * Read some file format
	 * @param configFile
	 */
	readFile(configFile: string): Dictionary {
		const ext = extname(configFile) || '';

		try {
			switch (ext.toLowerCase()) {
				case '.js':
					return _require(configFile);
				default:
					return this.readJSONFile(configFile);
			}
		} catch {
		}

		return {};
	}

	/**
	 * Read JSON File
	 */
	readJSONFile(configFile: string): Dictionary {
		if (existsSync(configFile)) {
			try {
				return JSON.parse(stripJsonComments(readFileSync(configFile, 'utf8')));
			} catch {
			}
		}

		return {};
	}

	/**
	 * Try read config file .stlintrc
	 */
	applyConfig(configFile: string, customConfig: Dictionary): void {
		const
			dir = dirname(configFile),
			normalizePath = (extra: string): string => resolve(dir, extra);

		if (customConfig.extraRules) {
			customConfig.extraRules = Array.isArray(customConfig.extraRules) ?
				customConfig.extraRules.map(normalizePath) : normalizePath(customConfig.extraRules);
		}

		if (customConfig.preprocessors) {
			customConfig.preprocessors = customConfig.preprocessors.map(normalizePath);
		}

		this.extendsOption(customConfig, this);
	}

	/**
	 * Extends second object from first
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

		const
			file = stat.isFile() ? path : resolve(path, this.configName);

		this.applyConfig(file, this.readFile(file));
	}
}
