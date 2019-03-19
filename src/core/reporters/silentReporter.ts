import { Reporter } from '../reporter';

export class SilentReporter extends Reporter {
	log(): void {
		// ignore
	}
	reset(): void {
		// ignore
	}
}
