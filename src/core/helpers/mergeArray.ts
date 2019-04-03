/**
 * Merge two array
 * @param a
 * @param b
 */
export function mergeArray<A = any, B = any>(a: Array<A>, b: Array<B>): Array<A | B> {
	let result = a.map((value, index) => b[index] !== undefined ? b[index] : a[index]);

	if (b.length > a.length) {
		result = result.concat(b.slice(a.length));
	}

	return result;
}
