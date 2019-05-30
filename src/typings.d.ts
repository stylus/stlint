declare module 'stylus/lib/parser';
declare module 'strip-json-comments';
declare module 'columnify';
declare module 'chalk';
declare module 'node-watch';
declare module 'native-require';
declare module 'escaper';

declare module '*.json' {
	const value: any;
	export default value;
}

// @ts-ignore
interface Dictionary<T = any> {[key: string]: T}
