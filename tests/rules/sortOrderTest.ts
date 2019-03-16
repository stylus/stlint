import { SortOrder } from "../../src/rules";
import { parseAndRun } from "../staff/bootstrap";
import { expect } from "chai";
import * as data from "../../src/defaultRules.json";

const content = '.tab\n' +
	'\tcolor #CCC\n' +
	'\tmargin 10px\n' +
	'\tbackground-color $p.color\n' +
	'';

describe('Test order rule', () => {
	describe('Alphabetical order', () => {
		it('should check properties in alphabetical order', () => {
			const rule = new SortOrder({
				conf: "alphabetical"
			});

			parseAndRun(content, rule);

			expect(rule.errors.length).to.be.equal(3)
		});
	});
	describe('Custom order', () => {
		describe('Matched order', () => {
			it('should check properties sorted in custom order', () => {
				const rule = new SortOrder({
					conf: "grouped",
					order: [
						'color',
						'margin',
						'background-color',
					]
				});

				parseAndRun(content, rule);

				expect(rule.errors.length).to.be.equal(0)
			});
		});
		describe('Not matched order', () => {
			it('should check properties sorted in custom order', () => {
				const rule = new SortOrder({
					conf: "grouped",
					order: [
						'margin',
						'background-color',
						'color',
					]
				});

				parseAndRun(content, rule);

				expect(rule.errors.length).to.be.equal(3)
			});
		});
	});
	describe('Grouped order', () => {
		it('should check properties order by list positions', () => {
			const rule = new SortOrder({
				conf: "grouped",
				startGroupChecking: 1,
				order: [
					[
						'position',
						'right',
						'left',
						'flexbox'
					],
					['font-size'],
					[
						'color',
						'background-color'
					],
				]
			});

			parseAndRun('.tab\n' +
				'\tposition absolute\n' +
				'\tright 10px\n' +
				'\tleft 10px\n' +
				'\tflexbox()\n' +
				'\tfont-size 10px\n' +
				'\tcolor #CCC\n' +
				'\tbackground-color $p.color\n' +
				'', rule);

			expect(rule.errors.length).to.be.equal(2)
		});

		describe('Set big startGroupChecking', () => {
			it('should not check properties in alphabetical order', () => {
				const rule = new SortOrder({
					conf: "grouped",
					startGroupChecking: 7,
					order: [
						[
							'position',
							'right',
							'left',
						],
						['font-size'],
						[
							'color',
							'background-color'
						],
					]
				});

				parseAndRun('.tab\n' +
					'\tposition absolute\n' +
					'\tright 10px\n' +
					'\tleft 10px\n' +
					'\tfont-size 10px\n' +
					'\tcolor #CCC\n' +
					'\tbackground-color $p.color\n' +
					'', rule);

				expect(rule.errors.length).to.be.equal(0)
			});
		});

		describe('Check default options rule', () => {
			it('Should check by default options', () => {
				const rule = new SortOrder({
					conf: "grouped",
					startGroupChecking: 6,
					order: (<Dictionary>data).sortOrder.order
				});

				parseAndRun('&__item3-title\n' +
					'\tabsolute top basis(3) right basis(3)\n' +
					'\tz-index 100\n' +
					'\n' +
					'\tdisplay flex\n' +
					'\tflex-direction column\n' +
					'\tjustify-content center\n' +
					'\talign-items center\n' +
					'\tsize 12px 0\n' +
					'\twidth basis(40)\n' +
					'\tpadding basis(4) 0\n' +
					'\n' +
					'\tfont Roboto\n' +
					'\tfont-aboto Bold\n' +
					'\tfont-roboto Bold\n' +
					'\tfont-toboto Bold\n' +
					'\tfont-size 12px\n' +
					'\n' +
					'\tborder-radius 7px\n' +
					'\tbackground-color $p.dialogBackground' +
					'\n' +
					'\tdiv&\n' +
					'\t\tcursor default\n' +
					'\n' +
					'\ta&\n' +
					'\t\tuser-select none\n' +
					'\t\t&::before\n' +
					'\t\t\tabsolute left top\n' +
					'\n' +
					'\t\t\tcontent ""\n' +
					'\t\t\tdisplay block\n' +
					'\t\t\twidth 100%\n' +
					'\t\t\theight basis()\n' +
					'\n' +
					'\t\t\tbackground-image $p.shadowBgColor\n' +
					'\t&_selected_true\n' +
					'\t\tpadding-left $p.paddingLeft' +
				'', rule);

				expect(rule.errors.length).to.be.equal(0)
			});
		});
	});
});
