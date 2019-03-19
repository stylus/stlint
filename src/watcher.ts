import watch from 'node-watch';

export class Watcher {
	start(path: string, callback: () => void): void {
		watch(path, {
			encoding : 'utf-8',
			recursive: true,
			filter: /\.styl$/
		}, callback);
	}
}
