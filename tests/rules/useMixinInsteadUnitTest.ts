import { expect } from 'chai';
import { useMixinInsteadUnit } from '../../src/rules/index';
import { parseAndRun } from '../staff/bootstrap';

describe('Use basis mixin test', () => {
	describe('Need replace px unit to basis(*)', () => {
		it('Should check the AST has Unit node with wrong unit notation', () => {

			const rule = new useMixinInsteadUnit({
				conf: 'always',
				mixin: 'basis',
				unitType: 'px'
			});

			parseAndRun('.tab\n\tfontsize 12px', rule);

			expect(rule.errors.length).to.be.equal(1);
			expect(rule.errors[0][1]).to.be.equal('Use "basis" mixin instead "px"');
			expect(rule.errors[0][5]).to.be.equal('basis(1.5)');
		});
		describe('Deny use some mixin', () => {
			it('Should check the AST has Unit node with wrong unit notation but no need replace', () => {

				const rule = new useMixinInsteadUnit({
					conf: 'never',
					mixin: 'basis',
					unitType: 'px'
				});

				parseAndRun('.tab\n\tfontsize 12px', rule);

				expect(rule.errors.length).to.be.equal(0);
			});
			it('Should check the AST has ? node with wrong "basis" notation', () => {

				const rule = new useMixinInsteadUnit({
					conf: 'never',
					mixin: 'basis',
					unitType: 'px'
				});

				parseAndRun('.tab\n\tfontsize basis(1.5)', rule);

				expect(rule.errors.length).to.be.equal(1);
				expect(rule.errors[0][1]).to.be.equal('Do not use "basis" mixin');
			});
			describe('Another mixin name', () => {
				it('Should check the AST has ? node with wrong "MixinName" notation', () => {

					const rule = new useMixinInsteadUnit({
						conf: 'never',
						mixin: 'MixinName',
						unitType: 'px'
					});

					parseAndRun('.tab\n\tfontsize MixinName(1.5)', rule);

					expect(rule.errors.length).to.be.equal(1);
					expect(rule.errors[0][1]).to.be.equal('Do not use "MixinName" mixin');
				});
			});
		});
	});
	describe('Use another unit type', () => {
		it('Should check the AST has Unit node with wrong unit notation', () => {

			const rule = new useMixinInsteadUnit({
				conf: 'always',
				mixin: 'percent',
				unitType: 'em'
			});

			parseAndRun('.tab\n\twidth 1em', rule);

			expect(rule.errors.length).to.be.equal(1);
			expect(rule.errors[0][1]).to.be.equal('Use "percent" mixin instead "em"');
		});
	});
});
