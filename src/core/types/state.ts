export type modes = 'always' | 'never' | 'lowercase' | 'uppercase' | 'double' | 'single';

export interface IState {
	conf: modes;
	enabled?: boolean;
}

export type State = IState | [ modes, boolean] | [ modes ];
