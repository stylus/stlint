/**
 * Check if element is simple plaint object
 *
 * @param obj
 */
export const isPlainObject = (obj: unknown): boolean => {
	if (typeof obj !== 'object') {
		return false;
	}

	return !(
		obj &&
		obj.constructor &&
		!{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')
	);
};
