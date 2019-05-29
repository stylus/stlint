import { Linter } from '../src/linter';
import { expect } from 'chai';
import * as path from 'path';
import { IState } from '../src/core/types/state';

describe('Test extends options', () => {
	describe('Replace order array in sortOrder rule', () => {
		it('Should replace order array', () => {
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

			expect((<any>linter.config.rules.sortOrder).order).to.be.deep.equal([
				'padding',
				'background',
				'absolute',
				'left',
				'color',
				'outline'
			]);

			expect(linter.config.grep).to.be.equal('sortOrder');
			expect(linter.config.reporter).to.be.equal('silent');
			expect(linter.config.fix).to.be.true;
		});
	});
	describe('Use JS file as config', () => {
		it('Should replace default rule', () => {
			const
				linter1 = new Linter(),
				linter2 = new Linter({
					extends: [path.join(__dirname, './staff/extends.js')]
				}),
				state1 = <IState>linter1.config.rules.color,
				state2 = <IState>linter2.config.rules.color;

			expect(state1.conf).to.be.equal('uppercase');
			expect(state2.conf).to.be.equal('test-extends');
		});
	});
	describe('Extends rules', () => {
		it('Should replace default rule', () => {
			const
				linter1 = new Linter(),
				linter2 = new Linter({
					extends: [path.join(__dirname, './staff/extends.json')]
				}),
				state1 = <IState>linter1.config.rules.color,
				state2 = <IState>linter2.config.rules.color;

			expect(state1.conf).to.be.equal('uppercase');
			expect(state2.conf).to.be.equal('test-extends');
		});
		describe('With custom rules', () => {
			it('Should not replace custom rule', () => {
				const
					linter = new Linter({
						extends: [path.join(__dirname, './staff/extends.json')],
						rules: {
							color: 	{
								conf: 'test-sign',
								enabled: 2
							}
						}
					}),
					state = <IState>linter.config.rules.color;

				expect(state.conf).to.be.equal('test-sign');
				expect(state.enabled).to.be.equal(2);
				expect(state.allowOnlyInVar).to.be.equal(5);
				expect(state.denyRGB).to.be.equal(true);
			});
			describe('Use file config', () => {
				it('Should not replace custom rule', () => {
					const
						linter = new Linter({
							config: path.join(__dirname, './staff/config.json')
						}),
						state = <IState>linter.config.rules.color;

					expect(state.conf).to.be.equal('test-config'); 	// from config.json
					expect(state.enabled).to.be.equal(false);				// from config.json
					expect(state.allowOnlyInVar).to.be.equal(3);		// from config.json
					expect(state.denyRGB).to.be.equal(true);				// default
					expect(state.allowShortcut).to.be.equal(7);			// from extends.json
				});
			});
		});
	});
	describe('Preprocess content', () => {
		it('Should load preprocessor function and apply this to content before lint', () => {
			const
				linter = new Linter({
					preprocessors: [
						path.join(__dirname, './staff/preprocessor.js')
					]
				});

			const rightContent = '.c\n\tabsolute left right 0';

			linter.lint('./test.styl', rightContent);

			const response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(3);
		});
		describe('Path to preprocessor', () => {
			it('Should calculate by config file', () => {
				const
					linter = new Linter({
						extends: [
							path.join(__dirname, './staff/subfolder/extends.json')
						]
					});

				const rightContent = '.c\n\tabsolute left right 0';

				const content = linter.lint('./test.styl', rightContent);

				expect(content.content).to.be.equal(rightContent + 'i work');
			});
		});
	});
});
