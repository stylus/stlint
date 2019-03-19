function TestRule() {
	this.checkLine = (line) => {
		if (line.lineno === 1) {
			this.msg('Test error on test line', 1, 1, line.length);
		}
	};
}

module.exports.TestRule = TestRule;
