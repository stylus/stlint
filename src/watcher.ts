import { watch } from "fs";

export class Watcher {
	start(path: string) {
		watch(path, {encoding : 'utf-8'}, (eventName: string, filename: string | Buffer) => {
			if (filename && /\.styl$/) {
				console.log(1);
			}
		})
	}
}
