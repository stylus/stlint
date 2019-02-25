import { LeadingZero } from "../../src/rules";
import { expect } from "chai";

describe('Leading Zero test', () => {
	it('Should check the line has wrong unit notation', () => {
		const rule = new LeadingZero({
			conf: "always"
		});

		expect(rule.checkLine({
			line: 'font-size: .1em'
		})).to.be.false;

		expect(rule.checkLine({
			line: 'font-size:.1em'
		})).to.be.false;

		expect(rule.checkLine({
			line: 'font-size : .1111px'
		})).to.be.false;

		expect(rule.errors.length).to.be.equal(3)
	});
	it('Should check the line has right unit notation', () => {
		const rule = new LeadingZero({
			conf: "always"
		});

		expect(rule.checkLine({
			line: 'font-size: 0.1em'
		})).to.be.true;

		expect(rule.checkLine({
			line: 'font-size:0.1em'
		})).to.be.true;

		expect(rule.checkLine({
			line: 'font-size : 0.1111px'
		})).to.be.true;

		expect(rule.errors.length).to.be.equal(0)
	});
});
