import { expect } from 'chai';
import { calcPosition } from '../../src/core/helpers/calcPosition';

const multyLineText = '.item2-title\n' + 							// 1 13
'	display flex\n' +																		// 2 27
'	align-items center\n' +															// 3 47
'	box-sizing border-box\n' +													// 4 70
'	height $p.item2Height\n' +													// 5 93
'	padding-left $p.paddingLeft - $p.border[0]\n' +			// 6 137
'\n' +																								// 7 138
'	font-size basis(1.875)\n' +													// 8 162
'\n' +																								// 9 163
'	border $p.border\n' +																// 10 181
'	border-width 0 $p.border[0]\n' +										// 11 210
'	color $p.secondSlideTitleColor`;\n';								// 12 244

describe('CalcPosition helper test', () => {
	it('Should calc position right', () => {
		const content = multyLineText;
		expect(calcPosition(1, 1, content)).to.equal(0);
		expect(calcPosition(1, 5, content)).to.equal(4);
		expect(calcPosition(2, 5, content)).to.equal(17);
		expect(calcPosition(10, 5, content)).to.equal(167);
		expect(calcPosition(-1, 5, content)).to.equal(4);
		expect(calcPosition(100, 5, content)).to.equal(249);
	});
});
