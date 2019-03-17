export interface IFix {
	replace: string;
}

export interface IMessage {
	rule: string;
	descr: string;
	path: string;
	line: number;
	endline: number;
	start: number;
	end: number;
	fix: IFix | null;
}

export interface IMessagePack {
	message: IMessage[]
}
