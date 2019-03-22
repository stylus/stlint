import { Linter } from '../src/linter';
import { expect } from 'chai';

const
	wrongContent = '.tab\n\tcolor: #ccc;';

Linter.prototype.saveFix = (path: string, content: string): void => {
	// do nothing
};

describe('Test fix option', () => {
	describe('Fix color', () => {
		it('should replace lowercase color to uppercase', () => {
			const linter = new Linter({
				rules: {
					color: {
						conf: 'uppercase'
					}
				},
				grep: 'color',
				reporter: 'silent',
				fix: true
			});

			linter.lint('./test.styl', wrongContent);
			linter.display(false);

			const response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(2);
			expect('.tab\n\tcolor: #CCC;').to.be.equal(linter.fix('./test.styl', wrongContent));
		});
	});
});
