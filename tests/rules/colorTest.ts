import { Color } from "../../src/rules";
import { expect } from "chai";
import { parseAndRun } from "../staff/bootstrap";

describe('Color test', () => {
	describe('Need uppercase notation', () => {
		it('Should check the AST has RGB node with wrong color notation', () => {
			const rule = new Color({
				conf: "uppercase"
			});

			parseAndRun('.tab\n\tcolor: #ccc\n\tbackground-color #fff', rule);

			expect(rule.errors.length).to.be.equal(2)
		});
		it('Should check the AST has RGB node with right color notation', () => {
			const rule = new Color({
				conf: "uppercase"
			});

			parseAndRun('.tab\n\tcolor: #CCC', rule);

			expect(rule.errors.length).to.be.equal(0)
		});
	});
	describe('Need lowercase notation', () => {
		it('Should check the AST has RGB node with right color notation', () => {
			const rule = new Color({
				conf: "lowercase"
			});

			parseAndRun('.tab\n\tcolor: #ccc\n\tbackground-color #fff', rule);

			expect(rule.errors.length).to.be.equal(0)
		});
		it('Should check the AST has RGB node with wrong color notation', () => {
			const rule = new Color({
				conf: "lowercase"
			});

			parseAndRun('.tab\n\tcolor: #CCC', rule);

			expect(rule.errors.length).to.be.equal(1)
		});
	});
	describe('Only in variable', () => {
		it('Should check RGB node only in variable', () => {
			const rule = new Color({
				conf: "uppercase",
				allowOnlyInVar: true
			});

			parseAndRun('$stop = #FFF\n' +
				'$p = {\n' +
				'\tcolor: #FFF\n' +
				'}\n' +
				'.tab\n' +
				'\tcolor: #CCC\n' +
				'\tcolor: $p.color\n', rule);

			expect(rule.errors.length).to.be.equal(1)
		});
		describe('Without error', () => {
			it('Should check RGB node only in variable', () => {
				const rule = new Color({
					conf: "uppercase",
					allowOnlyInVar: true
				});

				parseAndRun('$stop = #FFF\n' +
					'$p = {\n' +
					'\tcolor: #FFF\n' +
					'}\n' +
					'.tab\n' +
					'\tcolor $p.color\n' +
					'\tbackground-color $stop', rule);

				expect(rule.errors.length).to.be.equal(0)
			});
		});
		describe('Disable option rule', () => {
			it('Should not check RGB node only in variable', () => {
				const rule = new Color({
					conf: "uppercase",
					allowOnlyInVar: false
				});

				parseAndRun('$stop = #FFF\n' +
					'$p = {\n' +
					'\tcolor: #FFF\n' +
					'}\n' +
					'.tab\n' +
					'\tcolor: #CCC\n' +
					'\tcolor: $p.color\n', rule);

				expect(rule.errors.length).to.be.equal(0)
			});
		});
	});
});
