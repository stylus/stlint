import { INode } from './ast/node';
import { ILine } from './line';
import { IState } from './state';
import { IContent } from './content';
import { IConfig } from './config';

export type ErrorArray = [string, string, number, number, number, null | string, number];

export interface IRule<T extends IState = IState> {
	state: T;
	config: IConfig;
	setConfig(config: IConfig): void;

	cache: Dictionary;

	nodesFilter: string[] | null;

	errors: ErrorArray[];

	context: Dictionary;
	clearContext(): void;

	checkNode?(node: INode, content: IContent): void;
	checkLine?(line: ILine, index: number, content: IContent): void;

	msg(message: string, line: number, start: number, end: number, fix: null | string, endLine: number): void;

	isMatchType(type: string): boolean;
	clearErrors(): void;
}
