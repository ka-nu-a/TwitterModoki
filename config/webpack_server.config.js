const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: ['@babel/polyfill', './src/server/server.js'],
	target: "node",
	externals: [nodeExternals()], // https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
	node: {
		__dirname: false,
		__filename: false
	},
	plugins: [
		new webpack.IgnorePlugin(/^pg-native$/) // https://stackoverflow.com/questions/41522744/webpack-import-error-with-node-postgres-pg-client
	],
	output: {
		path: path.resolve('dist/server'),
		filename: 'server.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
}; 
