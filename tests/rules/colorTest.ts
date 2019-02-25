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
});
