import { Reporter } from "../reporter";

export class SilentReporter extends Reporter {
	log() {}
	reset() {}
}
