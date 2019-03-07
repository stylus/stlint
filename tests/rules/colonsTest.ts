import { Colons } from "../../src/rules";
import { expect } from "chai";
import {checkLine, splitAndRun} from "../staff/bootstrap";

describe('Colons test', () => {
		it('Should check the line has colons and they are needed', () => {
			const rule = new Colons({
				conf: "always"
			});

			expect(checkLine('color:#ccc', rule)).to.be.true;

			expect(rule.errors.length).to.be.equal(0)
		});

		describe('In hash object', () => {
			it('Should not find errors', () => {
				const rule = new Colons({
					conf: "never"
				});

				splitAndRun('$p = {\n\tcolor: #ccc;\n}', rule);

				expect(rule.errors.length).to.be.equal(0)
			});
		});

		describe('For variable', () => {
			it('Should work some way like for usual value', () => {
				const rule = new Colons({
					conf: "never"
				});

				splitAndRun(
					'$p = {\n' +
					'\tb: 1px solid #ccc\n' +
					'}\n' +
					'.test\n' +
					'\tmax-height: $headerHeight\n' +
					'\tborder: $p.border',
					rule
				);

				expect(rule.errors.length).to.be.equal(2)
			});
			describe('For nested variable', () => {
				it('Should not count errors', () => {
					const rule = new Colons({
						conf: "never"
					});

					splitAndRun(
						'$p = {\n' +
						'\tc: {test: 15px}\n' +
						'\tb: 1px solid #ccc\n' +
						'}\n' +
						'.test\n' +
						'\tmax-height: $headerHeight\n' +
						'\tborder: $p.border',
						rule
					);

					expect(rule.errors.length).to.be.equal(2)
				});
			});
		});

		it('Should check the line does not have colons but they are needed', () => {
			const rule = new Colons({
				conf: "always"
			});

			expect(checkLine('color #ccc', rule)).to.be.false;

			expect(rule.errors.length).to.be.equal(1)
		});

		it('Should check the line has colons but they are not needed', () => {
			const rule = new Colons({
				conf: "never"
			});

			expect(checkLine('color:#ccc', rule)).to.be.true;

			expect(rule.errors.length).to.be.equal(1)
		});

		it('Should check the line does not have colons and they are not needed', () => {
			const rule = new Colons({
				conf: "never"
			});

			expect(checkLine('color #ccc', rule)).to.be.false;

			expect(rule.errors.length).to.be.equal(0)
		});

		describe('Detect pseudo elements', () => {
			it('Should detect different between pseudo element and property: value expression', () => {
				const rule = new Colons({
					conf: "never"
				});

				expect(checkLine('.tab:first-child', rule)).to.be.not.true;
			});
		});
	});
