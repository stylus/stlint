import { Linter } from "./src/linter";
import { Watcher } from "./src/watcher";
import { Reader } from "./src/core/reader";



const StylusLinter = async (path: string | string[], content?: string, options: Dictionary = {}) => {
	// if (options.watch) {
	// 	const
	// 		watcher = new Watcher();
	//
	// 	watcher.start(path);
	// } else {
	const
		linter = new Linter(options),
		reader = new Reader(linter.config);

	await reader.read(path, linter.lint);

	linter.display();
};

module.exports = StylusLinter;

// StylusLinter('./test.styl');
