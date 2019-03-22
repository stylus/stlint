import { Linter } from '../src/linter';
import { expect } from 'chai';

const
	wrongContentWithVar = '$p = {\n' +
		'\tclr: #CCC\n' +
		'}\n' +
		'.tab\n' +
		'\tcolor: #ccc;',
	wrongContent = '.tab\n\tcolor: #ccc;',
	wrongContentColon = '.tab\n\tcolor #ccc;';

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

		describe('There is $p.color with same color value', () => {
			it('should replace lowercase color to variable', () => {
				const linter = new Linter({
					rules: {
						color: {
							conf: 'uppercase',
							allowOnlyInVar: true
						}
					},
					grep: 'color',
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContentWithVar);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(2);
				expect(wrongContentWithVar.replace('#ccc', '$p.clr')).to.be.equal(linter.fix('./test.styl', wrongContentWithVar));
			});
		});
	});
	describe('Fix colon', () => {
		describe('Never', () => {
			it('should remove colon between property and value', () => {
				const linter = new Linter({
					rules: {
						colons: {
							conf: 'never'
						}
					},
					grep: 'colons',
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContent);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(2);
				expect('.tab\n\tcolor #ccc;').to.be.equal(linter.fix('./test.styl', wrongContent));
			});
		});
		describe('Always', () => {
			it('should add colon between property and value', () => {
				const linter = new Linter({
					rules: {
						colons: {
							conf: 'always'
						}
					},
					grep: 'colons',
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContentColon);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(2);

				expect('.tab\n\tcolor: #ccc;').to.be.equal(linter.fix('./test.styl', wrongContentColon));
			});
		});
	});
});
