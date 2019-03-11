import watch = require("node-watch");

export class Watcher {
	start(path: string, callback: Function) {
		watch(path, {
			encoding : 'utf-8',
			recursive: true,
			filter: /\.styl$/
		}, callback)
	}
}
