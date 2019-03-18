import { Linter } from "../src/linter";
import { Rule } from "../src/core/rule";
import { expect } from "chai";

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

		expect(Rule.getContext().valueToVar).to.be.deep.equal({
			"#ccc": "color",
			"#ddd": "$p.colors[1]",
			"#eee": "$p.colors[2]",
			"$colors.base.third": "$p.discountBgColor",
			"$colors.grey[2]": "$p.offersShopsText",
			"$colors.white[0]": "$p.background",
			"1px": "$p.width[1]",
			"basis(10, 20px, #ccc)": "$p.width[0]",
			"black": "$p.color.fff[0]",
			"red": "$p.color.fff[1]",
			"rgba(0, 0, 0, 0.1)": "$p.colors[3]",
			"solid": "$p.width[2]",
		});
	});
});
