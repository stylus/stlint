import { Linter } from '../src/linter';
import { expect } from 'chai';
import { Content } from '../src/core/content';

const
	wrongContentWithVar = '$p = {\n' +
		'\tclr: #CCC\n' +
		'}\n' +
		'.tab\n' +
		'\tcolor: #ccc;\n' +
		'\tabsolute left 10px top 20px\n' +
		'\tbackground: #ccc;',

	wrongContentMultyLine = '$p = {\n' +
		'\tclr: #CCC\n' +
		'}\n' +
		'.tab\n' +
		'\tline-height: 10px;\n' +
		'\tcolor: #ccc;\n' +
		'\tabsolute left 10px\n' +
		'\n' +
		'\ttop 20px\n' +
		'\tpadding: 20px;\n' +
		'\tmargin 20px\n' +
		'\tfont-size: 12px;\n' +
		'\tbackground: #ccc;',

	wrongContentMultyLineWithRightOrder = '$p = {\n' +
		'\tclr: #CCC\n' +
		'}\n' +
		'.tab\n' +
		'\tabsolute left 10px\n' +
		'\ttop 20px\n' +
		'\tmargin 20px\n' +
		'\tpadding: 20px;\n' +
		'\tfont-size: 12px;\n' +
		'\tline-height: 10px;\n' +
		'\tbackground: #ccc;\n' +
		'\tcolor: #ccc;' +
		'',
	wrongContent = '.tab\n\tcolor: #ccc;',
	wrongContentColon = '.tab\n\tcolor #ccc;';

Linter.prototype.saveFix = (): void => {
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
			expect('.tab\n\tcolor: #CCC;').to.be.equal(linter.fix('./test.styl', new Content(wrongContent)));
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
					grep: /^color$/,
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContentWithVar);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(4);
				expect(
					wrongContentWithVar.replace(/#ccc/g, '$p.clr')
				).to.be.equal(linter.fix('./test.styl', new Content(wrongContentWithVar)));
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
				expect('.tab\n\tcolor #ccc;').to.be.equal(linter.fix('./test.styl', new Content(wrongContent)));
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

				expect(
					'.tab\n\tcolor: #ccc;'
				).to.be.equal(linter.fix('./test.styl', new Content(wrongContentColon)));
			});
		});
	});
	describe('Fix order', () => {
		describe('Grouped', () => {
			it('should fix properties order', () => {
				const linter = new Linter({
					rules: {
						sortOrder: {
							conf: 'grouped',
							order: [
								'color',
								'background',
								'absolute'
							]
						}
					},
					grep: 'sortOrder',
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContentWithVar);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(1);

				expect('$p = {\n' +
					'\tclr: #CCC\n' +
					'}\n' +
					'.tab\n' +
					'\tcolor: #ccc;\n' +
					'\tbackground: #ccc;\n' +
					'\tabsolute left 10px top 20px' +
					''
				).to.be.equal(linter.fix('./test.styl', new Content(wrongContentWithVar)));
			});
			describe('More 5', () => {
				it('should fix properties order and add separate lines', () => {
					const linter = new Linter({
						rules: {
							sortOrder: {
								conf: 'grouped',
								order: [
									[
										'absolute',
										'left',
										'top'
									],
									[
										'margin',
										'padding'
									],
									[
										'font',
										'line-height'
									],
									[
										'background',
										'color'
									]
								]
							}
						},
						grep: 'sortOrder',
						reporter: 'silent',
						fix: true
					});

					linter.lint('./test.styl', wrongContentMultyLine);
					linter.display(false);

					expect(
						linter.fix('./test.styl', new Content(wrongContentMultyLine))
					).to.be.equal('$p = {\n' +
						'\tclr: #CCC\n' +
						'}\n' +
						'.tab\n' +
						'\tabsolute left 10px\n' +
						'\ttop 20px\n' +
						'\n' +
						'\tmargin 20px\n' +
						'\tpadding: 20px;\n' +
						'\n' +
						'\tfont-size: 12px;\n' +
						'\tline-height: 10px;\n' +
						'\n' +
						'\tbackground: #ccc;\n' +
						'\tcolor: #ccc;' +
						''
					);
				});
				describe('Already sorted', () => {
					it('should only add separate lines', () => {
						const linter = new Linter({
							rules: {
								sortOrder: {
									conf: 'grouped',
									order: [
										[
											'absolute',
											'left',
											'top'
										],
										[
											'margin',
											'padding'
										],
										[
											'font',
											'line-height'
										],
										[
											'background',
											'color'
										]
									]
								}
							},
							grep: 'sortOrder',
							reporter: 'silent',
							fix: true
						});

						linter.lint('./test.styl', wrongContentMultyLineWithRightOrder);
						linter.display(false);

						const response = linter.reporter.response;

						expect(response.passed).to.be.false;
						expect(response.errors && response.errors.length).to.be.equal(3);

						expect(
							linter.fix('./test.styl', new Content(wrongContentMultyLineWithRightOrder))
						).to.be.equal('$p = {\n' +
							'\tclr: #CCC\n' +
							'}\n' +
							'.tab\n' +
							'\tabsolute left 10px\n' +
							'\ttop 20px\n' +
							'\n' +
							'\tmargin 20px\n' +
							'\tpadding: 20px;\n' +
							'\n' +
							'\tfont-size: 12px;\n' +
							'\tline-height: 10px;\n' +
							'\n' +
							'\tbackground: #ccc;\n' +
							'\tcolor: #ccc;' +
							''
						);
					});
				});
			});
		});
		describe('Alphabetical', () => {
			it('should fix properties order', () => {
				const linter = new Linter({
					rules: {
						sortOrder: {
							conf: 'alphabetical'
						}
					},
					grep: 'sortOrder',
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContentWithVar);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(1);

				expect('$p = {\n' +
					'\tclr: #CCC\n' +
					'}\n' +
					'.tab\n' +
					'\tabsolute left 10px top 20px\n' +
					'\tbackground: #ccc;\n' +
					'\tcolor: #ccc;').to.be.equal(linter.fix('./test.styl', new Content(wrongContentWithVar)));
			});
		});
	});
});
