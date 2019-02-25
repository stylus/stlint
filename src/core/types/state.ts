export type modes = 'always' | 'never' | 'lowercase' | 'uppercase';

export interface IState {
	conf: modes;
	enabled?: boolean;
}
