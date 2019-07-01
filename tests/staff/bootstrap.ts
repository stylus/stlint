import { IRule } from '../../src/core/types/rule';
import { Runner } from '../../src/core/runner';
import { StylusParser } from '../../src/core/parser';
import { Rule } from '../../src/core/rule';
import { Content } from '../../src/core/content';

/**
 * Parse tree AST and apply rule
 *
 * @param text
 * @param rule
 */
export const parseAndRun = (text: string, rule: IRule) => {
	const
		content = new Content(text),
		parser = new StylusParser({}),
		ast = parser.parse(content);

	if (rule.checkNode) {
		const
			runner = new Runner(ast, (node) => {
				if (rule.checkNode && rule.isMatchType(node.nodeName)) {
					rule.checkNode(node, content);
				}
			});

		runner.visit(ast, null);
	}

	if (rule.checkLine) {
		splitAndRun(text, rule, content);
	}
};

/**
 * Split content on lines and apply rule on every lines
 *
 * @param text
 * @param rule
 * @param content
 */
export const splitAndRun = (text: string, rule: IRule, content: Content = new Content(text)) => {
	if (rule.checkLine) {
		Rule.clearContext();

		content.forEach((line, index) => {
			if (index) {
				Rule.beforeCheckLine(line);
				rule.checkLine && rule.checkLine(line, index, content);
			}
		});
	}
};

/**
 * Check rule only on one line
 *
 * @param line
 * @param rule
 */
export const checkLine = (line: string, rule: IRule): void | boolean => {
	const content = new Content(line);

	return rule.checkLine && rule.checkLine(content.firstLine(), 0, content);
};
