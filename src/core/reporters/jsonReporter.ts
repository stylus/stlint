import { Reporter } from "../reporter";

export class JsonReporter extends Reporter {
	/**
	 * @override
	 */
	log() {
		console.log(JSON.stringify(this.response, null, 2));
	}
}
