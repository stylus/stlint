import { State } from "./core/types/state";
import data = require("./defaultRules.json");
import { BaseConfig } from "./core/baseConfig";
import { ReporterType } from "./core/types/reporter";
import { IConfig } from "./core/types/config";
import chalk from "chalk";
import { resolve } from "path";

export class Config extends BaseConfig implements IConfig {
	debug: boolean = false;
	reporter: ReporterType = 'raw';

	rules: Dictionary<State> = {...<any>data};
	defaultRules: Dictionary<State> = Object.freeze({...<any>data});

	excludes: string[] = ['node_modules/'];

	watch: boolean = false;

	path: string = '';
	grep: string = '';

	stylusParserOptions: Dictionary = {};

	extends: string | string[] = '';

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

		this.extendsOption(options, this);

		if (!this.configFile) {
			this.configFile = resolve(process.cwd(), this.configName);
		}

		this.readConfig(this.configFile);

		if (this.extends) {
			if (Array.isArray(this.extends)) {
				this.extends.forEach(this.extendsByPath.bind(this))
			} else {
				this.extendsByPath(this.extends);
			}
		}

		delete options.extraRules;
		this.extendsOption(options, this); // options are main
	}
}
