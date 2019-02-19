'use strict'
/**
 * main stylint kickoff function
 *
 * @param {string} path   [custom path if used programmatically]
 * @param {object} config [config if used programmatically]
 * @return {Object} [the composed stylint object]
 */
var StylusLinter = function(path, config, callback) {
	console.log(JSON.stringify({
		errors: [
			{
				message: [
					{
						descr: 'Something wrong1',
						path: '/Users/v-chupurnov/WebstormProjects/stylus-linter/test.styl',
						line: 3,
						endline: 4,
						start: 0,
						end: 3
					}
				]
			}
		]
	}));
};

module.exports = StylusLinter
