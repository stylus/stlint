const
	regOneElementColor = /([a-f0-9])\1{5}/i,
	regThreeElementColor = /([a-f0-9])\1([a-f0-9])\2([a-f0-9])\3/i;

/**
 * Return shortcut for color if it possible
 * @param color
 */
export function shortcutColor(color: string): string {
	if (regOneElementColor.test(color)) {
		return color.replace(regOneElementColor, '$1$1$1');
	}

	if (regThreeElementColor.test(color)) {
		return color.replace(regThreeElementColor, '$1$2$3');
	}

	return color;
}
