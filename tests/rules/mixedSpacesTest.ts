import { MixedSpaces } from "../../src/rules";
import { expect } from "chai";
import { checkLine } from "../staff/bootstrap";

describe('Mixed spaces check test', () => {
	it('Should check the line has mixed tabs and spaces', () => {
		const rule = new MixedSpaces({
			conf: "always"
		});

		expect(checkLine('\tcolor red', rule)).to.be.false;

		expect(checkLine('\t  color red', rule)).to.be.true;

		expect(checkLine(' \tcolor red', rule)).to.be.true;

		expect(checkLine('\t\tfont-size .1111px', rule)).to.be.false;

		expect(checkLine('  font-size .1111px', rule)).to.be.false;

		expect(rule.errors.length).to.be.equal(2)
	});
});
