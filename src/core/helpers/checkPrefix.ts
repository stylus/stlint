/**
 * Used in conjunction with the valid check (for valid css)
 *
 * @param [prop] the property to prepend prefixes to
 * @param [css] the css key we're checking against (from valid.json)
 * @param [valid] the valid.json object
 * @returns {boolean} true if at least one match found, false if not
 */
export const checkPrefix = (prop: string, css: string, valid: ValidCSS): boolean =>
	valid.prefixes.some((prefix) => prop === prefix + css);
