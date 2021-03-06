import { State } from './state';
import { ReporterType } from './reporter';

export interface IConfig {
	[key: string]: any;
	configName: string
	configFile: string

	debug: boolean
	reporter: ReporterType

	basepath: string
	path: string

	preprocessors: string[];
	autocompletes: string[];

	grep: string
	doc: string
	fix: boolean

	rules: Dictionary<State>;
	defaultRules: Dictionary<State>;

	excludes: string[]

	watch: boolean

	stylusParserOptions: Dictionary
	reportOptions: Dictionary

	extends: string | string[];
	extraRules: string | string[];

	customProperties: string[];

	extendsOption(from: Dictionary, to: Dictionary): void;
	applyConfig(path: string, config: Dictionary): void;
}
