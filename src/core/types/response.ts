import { IMessage } from "./message";

export interface IResponse {
	passed: boolean;
	errors?: Array<{
		message: IMessage[]
	}>;
}
