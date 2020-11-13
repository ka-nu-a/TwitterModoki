const path = require('path')

module.exports = {
	entry: "./src/server/server.js",
	target: "node",
	node: {
		__dirname: false,
		__filename: false
	},
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
