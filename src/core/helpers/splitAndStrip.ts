/**
 * Split str by reg exp
 * @param re
 * @param line
 */
export const splitAndStrip = (re: RegExp, line: string): string[] =>
	line.split(re).filter((str) => str.length > 0);
