import { LeadingZero } from "../../src/rules";
import { expect } from "chai";
import { checkLine } from "../staff/bootstrap";

describe('Leading Zero test', () => {
	it('Should check the line has wrong unit notation', () => {
		const rule = new LeadingZero({
			conf: "always"
		});

		expect(checkLine('font-size: .1em', rule)).to.be.false;

		expect(checkLine('font-size:.1em', rule)).to.be.false;

		expect(checkLine('font-size : .1111px', rule)).to.be.false;

		expect(rule.errors.length).to.be.equal(3)
	});
	it('Should check the line has right unit notation', () => {
		const rule = new LeadingZero({
			conf: "always"
		});

		expect(checkLine('font-size: 0.1em', rule)).to.be.true;

		expect(checkLine('font-size:0.1em', rule)).to.be.true;

		expect(checkLine('font-size : 0.1111px', rule)).to.be.true;

		expect(rule.errors.length).to.be.equal(0)
	});
});
