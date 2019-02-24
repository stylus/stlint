export type modes = 'always' | 'never';

export interface IState {
	conf: modes;
	enabled?: boolean;
}
