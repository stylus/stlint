import { State } from "./state";
import { ReporterType } from "./reporter";

export interface IConfig {
	extendsOption(from: Dictionary, to: Dictionary): void;
	readCustomConfig(): void;
	configName: string
	configFile: string

	debug: boolean
	reporter: ReporterType
	path: string

	rules: Dictionary<State>;
	defaultRules: Dictionary<State>;

	excludes: string[]

	watch: boolean

	stylusParserOptions: Dictionary
	reportOptions: Dictionary

	[key: string]: any;
}
