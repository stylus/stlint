import { State } from "./core/types/state";
import * as data from "./defaultRules.json";
import { BaseConfig } from "./core/baseConfig";
import { ReporterType } from "./core/types/reporter";
import { IConfig } from "./core/types/config";
import chalk = require("chalk");

export class Config extends BaseConfig implements IConfig {
	debug: boolean = false;
	reporter: ReporterType = 'raw';

	rules: Dictionary<State> = {...<any>data};
	readonly defaultRules: Dictionary<State> = {...<any>data};

	excludes: string[] = ['node_modules/'];

	watch: boolean = false;

	path: string = '';

	stylusParserOptions: Dictionary = {};

	reportOptions = {
		columnSplitter: ' | ',
		headingTransform: (heading: string) => {
			return chalk.yellow(heading.toUpperCase())
		},
		maxWidth: 70,
		minWidth: 10,
		truncate: false,
	};

	constructor(options: Dictionary) {
		super();
		this.readCustomConfig();
		this.extendsOption(options, this);
	}
}
