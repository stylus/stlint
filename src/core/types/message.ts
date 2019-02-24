export interface IMessage {
	descr: string;
	path: string;
	line: number;
	endline: number;
	start: number;
	end: number;
}

export interface IMessagePack {
	message: IMessage[]
}
