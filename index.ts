import { Linter } from "./src/linter";

const StylusLinter = (path: string, content?: string, options: Dictionary = {}): void => {
	const linter = new Linter(path, content, options);
	linter.lint();
};

module.exports = StylusLinter;

// StylusLinter('./test.styl');
