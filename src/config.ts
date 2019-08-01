import { State } from './core/types/state';
import data = require('./defaultRules.json');
import { BaseConfig } from './core/baseConfig';
import { ReporterType } from './core/types/reporter';
import { IConfig } from './core/types/config';
import chalk from 'chalk';
import { resolve } from 'path';

export class Config extends BaseConfig implements IConfig {
	debug: boolean = false;
	reporter: ReporterType = 'raw';

	rules: Dictionary<State> = {...<any>data};
	defaultRules: Dictionary<State> = Object.freeze({...<any>data});

	excludes: string[] = ['node_modules/'];

	watch: boolean = false;

	path: string = '';
	grep: string = '';
	doc: string = '';
	fix: boolean = false;

	stylusParserOptions: Dictionary = {};

	extends: string | string[] = '';
	customProperties: string[] = [];

	reportOptions: Dictionary = {
		columnSplitter: ' | ',
		headingTransform: (heading: string) =>
			chalk.yellow(heading.toUpperCase()),
		truncate: false
	};

	constructor(options: Dictionary) {
		super();

		this.extendsOption(options, this);

		if (!this.configFile) {
			this.configFile = resolve(process.cwd(), this.configName);
		}

		const
			customConfig = this.readFile(this.configFile);

		this.extendsOption(options, customConfig);

		if (customConfig.extends) {
			if (Array.isArray(customConfig.extends)) {
				customConfig.extends.forEach(this.extendsByPath.bind(this));
			} else {
				this.extendsByPath(customConfig.extends);
			}
		}

		this.applyConfig(this.configFile, customConfig);

		delete options.extraRules;

		this.extendsOption(options, this); // options are main
	}
}
