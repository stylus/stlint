import { Linter } from "../src/linter";
import { expect } from "chai";

describe('Test `extraRules` options', () => {
	describe('like folder', () => {
		it('Should load rules from path and check these', () => {
			const linter = new Linter({
				extraRules: './tests/staff/extra'
			});

			linter.lint('./test.styl', '.test\n\tcolor red');

			expect(linter.reporter.response.passed).to.be.false;
			const errors = linter.reporter.response.errors;
			expect(errors && errors[0].message[0].rule).to.be.equal('testRule');
		});
	});
	describe('like files', () => {
		it('Should load rules from path and check these', () => {
			const linter = new Linter({
				extraRules: './tests/staff/extra/testRule.js'
			});

			linter.lint('./test.styl', '.test\n\tcolor red');

			expect(linter.reporter.response.passed).to.be.false;
			const errors = linter.reporter.response.errors;
			expect(errors && errors[0].message[0].rule).to.be.equal('testRule');
		});
	});
	describe('like list of files', () => {
		it('Should load rules from all paths and check these', () => {
			const linter = new Linter({
				extraRules: [
					'./tests/staff/extra/testRule.js'
				],
			});

			linter.lint('./test.styl', '.test\n\tcolor red');

			expect(linter.reporter.response.passed).to.be.false;
			const errors = linter.reporter.response.errors;
			expect(errors && errors[0].message[0].rule).to.be.equal('testRule');
		});
	});
});
