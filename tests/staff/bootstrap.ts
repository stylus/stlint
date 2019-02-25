import { Config } from "../../src/config";

Config.getInstance({
	reporter: 'emptyout',
	config: './.notexistsfile'
});
