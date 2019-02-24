import { expect } from 'chai';
import { Linter } from '../src/linter';

const
	wrongContent = `.tab\n\tcolor: #ccc`;

describe('Smoke test', () => {
	it('should work fine', () => {
		const linter = new Linter('./test.styl', wrongContent);
		linter.lint();
	});
});
