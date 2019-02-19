import { Reporter } from './src/core/reporter';
import { Visitor } from './src/core/visitor';
import { StylusParser } from './src/core/parser';
import { resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { Checker } from "./src/core/checker";

const StylusLinter = (path: string) => {
	path = resolve(path);

	const reporter = new Reporter(path);
	const parser = new StylusParser();
	const checker = new Checker(reporter);

	try {
		if (!existsSync(path)) {
			throw new Error('File not exists');
		}

		const ast = parser.parse(path);

		checker.checkRules(ast);

		writeFileSync('test.json', JSON.stringify(ast, null, 2), 'utf-8')

	} catch (e) {
		reporter.add(e.message, e.lineno);
	}

	reporter.display();
};

module.exports = StylusLinter;
