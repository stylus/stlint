import Reporter from './src/core/reporter';
import { StylusParser } from './src/core/parser';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { inspect } from 'util';

const StylusLinter = (path: string) => {
	path = resolve(path);

	const reporter = new Reporter();
	const parser = new StylusParser();

	try {
		if (!existsSync(path)) {
			throw new Error('File not exists');
		}

		const ast = parser.parse(path);
		console.log(inspect(ast, false, null, true))

	} catch (e) {
		reporter.add(e.message, path, e.lineno);
	}

	reporter.display();
};

module.exports = StylusLinter;
