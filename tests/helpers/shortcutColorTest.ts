import { expect } from 'chai';
import { shortcutColor } from '../../src/core/helpers/shortcutColor';

describe('colorCanBeShortcut helper test', () => {
	it('Should check color can have shortcut form', () => {
		const colors: Array<[string, string]> = [
			['#ffffff', '#fff'],
			['#FFFFFF', '#FFF'],
			['#fffffd', '#fffffd'],
			['#ffccff', '#fcf'],
			['#113322', '#132'],
			['#113321', '#113321'],
			['#abccba', '#abccba'],
			['#cccddd', '#cccddd'],
			['#000000', '#000'],
			['#ddd', '#ddd']
		];

		colors.forEach((pars) => {
			expect(shortcutColor(pars[0])).to.be.equal(pars[1]);
		});
	});
});
