const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node',
	entry: './index.ts',
	context: path.resolve(__dirname),
	externals: [nodeExternals()],
	devtool: false,
	resolve: {
		extensions: [ '.ts', '.js' ]
	},
	module: {
		rules: [
			{
				test: /\.(ts)$/,
				use: {
					loader: 'awesome-typescript-loader',
				},
				exclude: path.resolve(__dirname, "node_modules/stylus")
			}
		]
	},

	node: {
		__dirname: 'mock',
		fs: 'mock'
	},

	output: {
		filename: 'index.js',
		libraryTarget: "umd",
		path: path.resolve(__dirname, './')
	},

	mode: 'production',
	optimization: {
		minimize: false
	}
};
