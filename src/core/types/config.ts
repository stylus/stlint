import { State } from './state';
import { ReporterType } from './reporter';

export interface IConfig {

	[key: string]: any;
	configName: string
	configFile: string

	debug: boolean
	reporter: ReporterType
	path: string
	grep: string

	rules: Dictionary<State>;
	defaultRules: Dictionary<State>;

	excludes: string[]

	watch: boolean

	stylusParserOptions: Dictionary
	reportOptions: Dictionary

	extends: string | string[];
	extraRules: string | string[];
	extendsOption(from: Dictionary, to: Dictionary): void;
	readConfig(path: string): void;
}
