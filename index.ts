import { Reporter } from './src/core/reporter';
import { StylusParser } from './src/core/parser';
import { resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { Checker } from "./src/core/checker";

const StylusLinter = (path: string, content?: string): void => {
	path = resolve(path);

	const reporter = new Reporter(path);
	const parser = new StylusParser();
	const checker = new Checker(reporter);

	// writeFileSync('test.json', JSON.stringify(ast, null, 2), 'utf-8')
	try {
		writeFileSync(resolve('./test.txt'), content, 'utf-8');

		if (!existsSync(path)) {
			throw new Error('File not exists');
		}


		const ast = parser.parse(path, content);

		checker.checkRules(ast);



	} catch (e) {
		reporter.add(e.message, e.lineno);
	}

	reporter.display();
};

module.exports = StylusLinter;
