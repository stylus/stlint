export class DocReporter {
	/**
	 *
	 * @param data
	 */
	log(data: object): void {
		console.log(JSON.stringify(data));
		process.exit();
	}
}
