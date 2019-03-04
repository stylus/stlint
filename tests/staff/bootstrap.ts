import { Config } from "../../src/config";
import { IRule } from "../../src/core/types/rule";
import { Runner } from "../../src/core/runner";
import { StylusParser } from "../../src/core/parser";
import { ILine } from "../../src/core/types/line";
import { Rule } from "../../src/core/rule";

Config.getInstance({
	reporter: 'emptyout',
	config: './.notexistsfile'
});

/**
 * Парсит дерево АСТ а потом пробегает по нему правилом
 *
 * @param content
 * @param rule
 */
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

/**
 * Разбивает текст на строки а потом применяет к каждой строке правило
 *
 * @param content
 * @param rule
 */
export const splitAndRun = (content: string, rule: IRule) => {
	const lines: ILine[] = [];

	if (rule.checkLine) {
		content
			.split('\n')
			.map((ln, index) => {
				lines.push({
					line: ln,
					lineno: index,
					lines
				});
			});

		Rule.clearContext();

		lines
			.forEach((line) => {
				Rule.beforeCheckLine(line);
				rule.checkLine && rule.checkLine(line);
			})
	}
};
