import { MixedSpaces } from "../../src/rules";
import { expect } from "chai";

describe('Mixed spaces check test', () => {
	it('Should check the line has mixed tabs and spaces', () => {
		const rule = new MixedSpaces({
			conf: "always"
		});

		expect(rule.checkLine({
			line: '\tcolor red'
		})).to.be.false;

		expect(rule.checkLine({
			line: '\t  color red'
		})).to.be.true;

		expect(rule.checkLine({
			line: ' \tcolor red'
		})).to.be.true;

		expect(rule.checkLine({
			line: '\t\tfont-size .1111px'
		})).to.be.false;

		expect(rule.checkLine({
			line: '  font-size .1111px'
		})).to.be.false;

		expect(rule.errors.length).to.be.equal(2)
	});
});
