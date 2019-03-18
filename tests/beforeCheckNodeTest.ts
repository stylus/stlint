import {Linter} from "../src/linter";
import {Rule} from "../src/core/rule";
import {expect} from "chai";

describe('Before check node checker doing some work', () => {
	it('Should parse hash all variables', () => {
		const linter = new Linter();

		linter.lint('./test.styl', `$p = {
				colors: #ccc #ddd #eee rgba(0, 0, 0, 0.1)
				width: basis(10, 20px, #ccc) 1px solid,
				color: {
					fff: black red
				},
				background: $colors.white[0],
				offersShopsText: $colors.grey[2],
				discountBgColor: $colors.base.third
			}
			
			color = #ccc`
		);

		expect(Rule.getContext().vars).to.be.deep.equal({
			"$p": {
				"colors": ["#ccc", "#ddd", "#eee", "rgba(0, 0, 0, 0.1)"],
				"width": ["basis(10, 20px, #ccc)", "1px", "solid"],
				"color": {"fff": ["black", "red"]},
				"background": "$colors.white[0]",
				"offersShopsText": "$colors.grey[2]",
				"discountBgColor": "$colors.base.third"
			},
			"color": "#ccc"
		});

	});
});
