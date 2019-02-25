import { Config } from "../../src/config";
import { IRule } from "../../src/core/types/rule";
import { Runner } from "../../src/core/runner";
import {StylusParser} from "../../src/core/parser";

Config.getInstance({
	reporter: 'emptyout',
	config: './.notexistsfile'
});

export const parseAndRun = (content: string, rule: IRule) => {
	const
		parser = new StylusParser(),
		ast = parser.parse(content),
		runner = new Runner(ast, (node) => {
			if (rule.checkNode && rule.isMatchType(node.nodeName)) {
				rule.checkNode(node);
			}
		});

	runner.visit(ast);
};
