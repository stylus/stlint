import { Reporter } from "../reporter";

export class JsonReporter extends Reporter {
	/**
	 * @override
	 */
	log(exit: boolean) {
		console.log(JSON.stringify(this.response, null, 2));
	}
}
