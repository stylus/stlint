import { Config } from "../../src/config";
import { IRule } from "../../src/core/types/rule";
import { Runner } from "../../src/core/runner";
import { StylusParser } from "../../src/core/parser";
import { Rule } from "../../src/core/rule";
import { Line } from "../../src/core/line";

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
	if (rule.checkNode) {
		const
			parser = new StylusParser({}),
			ast = parser.parse(content),
			runner = new Runner(ast, (node) => {
				if (rule.checkNode && rule.isMatchType(node.nodeName)) {
					rule.checkNode(node);
				}
			});

		runner.visit(ast, null);
	}

	if (rule.checkLine) {
		splitAndRun(content, rule)
	}
};

/**
 * Разбивает текст на строки а потом применяет к каждой строке правило
 *
 * @param content
 * @param rule
 */
export const splitAndRun = (content: string, rule: IRule) => {
	const lines: Line[] = [];

	if (rule.checkLine) {
		content
			.split('\n')
			.map((ln, index) => {
				lines.push(new Line(
					ln,
					index,
					lines
				));
			});

		Rule.clearContext();

		lines
			.forEach((line, index) => {
				Rule.beforeCheckLine(line);
				rule.checkLine && rule.checkLine(line, index, lines);
			})
	}
};


export const checkLine = (line: string, rule: IRule): void | boolean => {
	const lines = [new Line(line)];

	return rule.checkLine && rule.checkLine(lines[0], 0, lines);
};
