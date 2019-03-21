import { Linter } from '../src/linter';
import { expect } from 'chai';

const
	wrongContent = '.tab\n\tcolor: #ccc;';

describe('Test grep option', () => {
	describe('Set grep option', () => {
		it('should show only errors contains grep option', () => {
			const linter = new Linter({
				grep: 'color',
				reporter: 'silent'
			});

			linter.lint('./test.styl', wrongContent);
			linter.display(false);

			const response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(2);
		});
	});
});
