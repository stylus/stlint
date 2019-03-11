import { State } from "./core/types/state";
import * as data from "./defaultRules.json";
import { BaseConfig } from "./core/baseConfig";
import { ReporterType } from "./core/types/reporter";
import { IConfig } from "./core/types/config";

export class Config extends BaseConfig implements IConfig {
	debug: boolean = false;
	reporter: ReporterType = 'raw';

	rules: Dictionary<State> = <any>data;

	excludes: string[] = [];

	watch: boolean = false;

	path: string = '';

	stylusParserOptions: Dictionary = {};

	constructor(options: Dictionary) {
		super();
		this.readCustomConfig();
		this.extendsOption(options, this);
	}
}
