import { Colons } from "../src/rules";
import { expect } from "chai";

describe('Rules test', () => {
	describe('Colons test', () => {
		it('Should check the line has colons and they are needed', () => {
			const rule = new Colons({
				conf: "always"
			});

			expect(rule.checkLine({
				line: 'color:#ccc'
			})).to.be.true;

			expect(rule.errors.length).to.be.equal(0)
		});

		it('Should check the line does not have colons but they are needed', () => {
			const rule = new Colons({
				conf: "always"
			});

			expect(rule.checkLine({
				line: 'color #ccc'
			})).to.be.false;

			expect(rule.errors.length).to.be.equal(1)
		});

		it('Should check the line has colons but they are not needed', () => {
			const rule = new Colons({
				conf: "never"
			});

			expect(rule.checkLine({
				line: 'color:#ccc'
			})).to.be.true;

			expect(rule.errors.length).to.be.equal(1)
		});

		it('Should check the line does not have colons and they are not needed', () => {
			const rule = new Colons({
				conf: "never"
			});

			expect(rule.checkLine({
				line: 'color #ccc'
			})).to.be.false;

			expect(rule.errors.length).to.be.equal(0)
		});

		describe('Detect pseudo elements', () => {
			it('Should detect different between pseudo element and property: value expression', () => {
				const rule = new Colons({
					conf: "never"
				});

				expect(rule.checkLine({
					line: '.tab:first-child'
				})).to.be.not.true;
			});
		});
	});
});
