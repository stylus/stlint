import { Linter } from '../src/linter';
import { expect } from 'chai';
import { Content } from '../src/core/content';
import { Color } from '../src/rules/color';
import { parseAndRun } from './staff/bootstrap';

const
	wrongContentWithVar = '$p = {\n' +
		'\tclr: #CCC\n' +
		'}\n' +
		'.tab\n' +
		'\tcolor: #ccc;\n' +
		'\tabsolute left 10px top 20px\n' +
		'\tbackground: #ccc;',

	wrongPropertyOnSeveralLinesContent = '.tab\n' +
		'\toutline: #ccc;\n' +
		'\tcolor: #ccc;\n' +
		'\tabsolute left 10px top 20px\n' +
		'\tbackground url(fromSVG(\n' +
		'\t\t\'<svg width="17" height="10">\n' +
		'\t\t\t<path d="M14.8465234,0.154589372 C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />\n' +
		'\t\t</svg>\')) no-repeat center center;\n' +
		'\tpadding: 10px;',

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

	wrongContentWithSelectorDivider = '$p = {\n' +
		'\tclr: #CCC\n' +
		'}\n' +
		'.tab\n' +
		'\tabsolute left 10px\n' +
		'\ttop 20px\n' +
		'\tmargin 20px\n' +
		'\tpadding: 20px;\n' +

		'\tinput\n' +
		'\t\tfont-size: 12px;\n' +

		'\tfont-size: 12px;\n' +
		'\tline-height: 10px;\n' +
		'\tbackground: #ccc;\n' +
		'\tcolor: #ccc;' +
		'',

	wrongContent = '.tab\n\tcolor: #ccc;',
	wrongContentColon = '.tab\n\tcolor #ccc';

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

		describe('Deny rgb notation', () => {
			it('Should fix RGB node with rgb or rgba color notation to HEX', () => {
				const wrongContentWithVar = '.tab\n\tcolor rgba(127, 127, 127, 0.6)\n\tbackground-color rgb(0, 0, 0)';

				const linter = new Linter({
					rules: {
						color: {
							conf: 'uppercase',
							allowOnlyInVar: false,
							denyRGB: true
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
				expect(response.errors && response.errors.length).to.be.equal(2);
				expect(
					'.tab\n\tcolor rgba(#7f7f7f, 1)\n\tbackground-color #000000'
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
				expect(response.errors && response.errors.length).to.be.equal(1);

				expect(
					'.tab\n\tcolor: #ccc'
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
			describe('Property on several lines', () => {
				it('should fix properties order', () => {
					const linter = new Linter({
						rules: {
							sortOrder: {
								conf: 'grouped',
								order: [
									'padding',
									'background',
									'absolute',
									'color',
									'outline'
								]
							}
						},
						grep: 'sortOrder',
						reporter: 'silent',
						fix: true
					});

					linter.lint('./test.styl', wrongPropertyOnSeveralLinesContent);
					linter.display(false);

					const response = linter.reporter.response;

					expect(response.passed).to.be.false;
					expect(response.errors && response.errors.length).to.be.equal(1);

					expect(linter.fix('./test.styl', new Content(wrongPropertyOnSeveralLinesContent)))
						.to.be.equal(
							'.tab\n' +
							'\tpadding: 10px;\n' +
							'\tbackground url(fromSVG(\n' +
							'\t\t\'<svg width="17" height="10">\n' +
							'\t\t\t<path d="M14.8465234,0.154589372 C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />\n' +
							'\t\t</svg>\')) no-repeat center center;\n' +
							'\tabsolute left 10px top 20px\n' +
							'\tcolor: #ccc;\n' +
							'\toutline: #ccc;' +
							''
							);
				});
				describe('On last position', () => {
					const
						wrongPropertyOnSeveralLinesContent = '.tab\n' +
							'\toutline: #ccc;\n' +
							'\tcolor: #ccc;\n' +
							'\tabsolute left 10px top 20px\n' +
							'\tpadding: 10px;\n' +
							'\tbackground url(fromSVG(\n' +
							'\t\t\'<svg width="17" height="10">\n' +
							'\t\t\t<path d="M14.8465234,0.154589372 C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />\n' +
							'\t\t</svg>\')) no-repeat center center;' +
							'';

					it('should fix properties order', () => {
						const linter = new Linter({
							rules: {
								sortOrder: {
									conf: 'grouped',
									order: [
										'padding',
										'background',
										'absolute',
										'color',
										'outline'
									]
								}
							},
							grep: 'sortOrder',
							reporter: 'silent',
							fix: true
						});

						linter.lint('./test.styl', wrongPropertyOnSeveralLinesContent);
						linter.display(false);

						const response = linter.reporter.response;

						expect(response.passed).to.be.false;
						expect(response.errors && response.errors.length).to.be.equal(1);

						expect(linter.fix('./test.styl', new Content(wrongPropertyOnSeveralLinesContent)))
							.to.be.equal(
							'.tab\n' +
							'\tpadding: 10px;\n' +
							'\tbackground url(fromSVG(\n' +
							'\t\t\'<svg width="17" height="10">\n' +
							'\t\t\t<path d="M14.8465234,0.154589372 C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />\n' +
							'\t\t</svg>\')) no-repeat center center;\n' +
							'\tabsolute left 10px top 20px\n' +
							'\tcolor: #ccc;\n' +
							'\toutline: #ccc;' +
							''
						);
					});

					describe('On last position property has normal order', () => {
						const
							wrongPropertyOnSeveralLinesContent = '.tab\n' +
								'\tleft 10px\n' +
								'\tcolor: #ccc\n' +
								'\tabsolute left 10px top 20px\n' +
								'\tbackground url(fromSVG(\n' +
								'\t\t\'<svg width="17" height="10"><path d="M14.8465234,0.154589372 ' +
								'C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />  </svg>\'\n' +
								'\t)) no-repeat center center\n' +
								'\tpadding: 10px;\n' +
								'\toutline #ccc;\n' +
								'';

						it('should fix properties order', () => {
							const linter = new Linter({
								rules: {
									sortOrder: {
										conf: 'grouped',
										order: [
											'padding',
											'background',
											'absolute',
											'left',
											'color',
											'outline'
										]
									}
								},
								grep: 'sortOrder',
								reporter: 'silent',
								fix: true
							});

							linter.lint('./test.styl', wrongPropertyOnSeveralLinesContent);
							linter.display(false);

							const response = linter.reporter.response;

							expect(response.passed).to.be.false;
							expect(response.errors && response.errors.length).to.be.equal(1);

							expect(linter.fix('./test.styl', new Content(wrongPropertyOnSeveralLinesContent)))
								.to.be.equal(
								'.tab\n' +
								'\tpadding: 10px;\n' +
								'\tbackground url(fromSVG(\n' +
								'\t\t\'<svg width="17" height="10"><path d="M14.8465234,0.154589372 ' +
								'C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />  </svg>\'\n' +
								'\t)) no-repeat center center\n' +
								'\tabsolute left 10px top 20px\n' +
								'\tleft 10px\n' +
								'\tcolor: #ccc\n' +
								'\toutline #ccc;\n' +
								''
							);
						});
					});
				});
				describe('Default core order', () => {
					const
						wrongPropertyOnSeveralLinesContent = '.tab\n' +
							'\toutline #ccc;\n' +
							'\tcolor: #ccc\n' +
							'\tabsolute left 10px top 20px\n' +
							'\tbackground url(fromSVG(\n' +
							'\t\t\'<svg width="17" height="10">\n' +
							'\t\t\t<path d="M14.8465234,0.154589372 C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />\n' +
							'\t\t</svg>\'\n' +
							'\t)) no-repeat center center\n' +
							'\tpadding: 10px;';

					it('should fix properties order', () => {
						const linter = new Linter({
							rules: {
								sortOrder: {
									conf: 'grouped'
								}
							},
							grep: 'sortOrder',
							reporter: 'silent',
							fix: true
						});

						linter.lint('./test.styl', wrongPropertyOnSeveralLinesContent);
						linter.display(false);

						const response = linter.reporter.response;

						expect(response.passed).to.be.false;
						expect(response.errors && response.errors.length).to.be.equal(1);

						expect(linter.fix('./test.styl', new Content(wrongPropertyOnSeveralLinesContent)))
							.to.be.equal(
							'.tab\n' +
							'\tabsolute left 10px top 20px\n' +
							'\tpadding: 10px;\n' +
							'\tcolor: #ccc\n' +
							'\tbackground url(fromSVG(\n' +
							'\t\t\'<svg width="17" height="10">\n' +
							'\t\t\t<path d="M14.8465234,0.154589372 C14.6397833,-0.0515297907 14.3038306,-0.0515297907" />\n' +
							'\t\t</svg>\'\n' +
							'\t)) no-repeat center center\n' +
							'\toutline #ccc;' +
							''
						);
					});
				});
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
			describe('Properties divide with some selector', () => {
				it('should fix properties order in every divided groups', () => {
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

					linter.lint('./test.styl', wrongContentWithSelectorDivider);
					linter.display(false);

					const response = linter.reporter.response;

					expect(response.passed).to.be.false;
					expect(response.errors && response.errors.length).to.be.equal(2);

					expect('$p = {\n' +
						'\tclr: #CCC\n' +
						'}\n' +
						'.tab\n' +
						'\tabsolute left 10px\n' +
						'\tmargin 20px\n' +
						'\tpadding: 20px;\n' +
						'\ttop 20px\n' +

						'\tinput\n' +
						'\t\tfont-size: 12px;\n' +

						'\tbackground: #ccc;\n' +
						'\tcolor: #ccc;\n' +
						'\tfont-size: 12px;\n' +
						'\tline-height: 10px;' +
						'').to.be.equal(linter.fix('./test.styl', new Content(wrongContentWithSelectorDivider)));
				});
			});
		});
	});
	describe('Fix semicolons', () => {
		describe('Never', () => {
			it('should remove semicolon after property and value', () => {
				const linter = new Linter({
					rules: {
						semicolons: {
							conf: 'never'
						}
					},
					grep: 'semicolons',
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContent);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(1);
				expect('.tab\n\tcolor: #ccc').to.be.equal(linter.fix('./test.styl', new Content(wrongContent)));
			});
		});
		describe('Always', () => {
			it('should add semicolon after property and value', () => {
				const linter = new Linter({
					rules: {
						semicolons: {
							conf: 'always'
						}
					},
					grep: 'semicolons',
					reporter: 'silent',
					fix: true
				});

				linter.lint('./test.styl', wrongContentColon);
				linter.display(false);

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(1);

				expect(
					'.tab\n\tcolor #ccc;'
				).to.be.equal(linter.fix('./test.styl', new Content(wrongContentColon)));
			});
		});
	});
});
