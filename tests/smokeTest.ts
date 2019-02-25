import { Linter } from '../src/linter';
import { expect } from 'chai';

const
	wrongContent = `.tab\n\tcolor: #ccc`;

describe('Smoke test', () => {
	it('should work fine', () => {
		const linter = new Linter('./test.styl', wrongContent);
		linter.lint();

		const response = linter.reporter.response;

		expect(response.passed).to.be.false;
		expect(response.errors && response.errors.length).to.be.equal(2)
	});
	describe('Empty file test', () => {
		it('should work fine', () => {
			const linter = new Linter('./test.styl', '');
			linter.lint();

			const response = linter.reporter.response;

			expect(response.passed).to.be.true;
			expect(response.errors).to.be.equal(void(0))
		});
	});
	describe('Wrong content file test', () => {
		it('should work fine', () => {
			const linter = new Linter('./test.styl', '.');
			linter.lint();

			const response = linter.reporter.response;

			expect(response.passed).to.be.true;
			expect(response.errors).to.be.equal(void(0))
		});
	});
});
