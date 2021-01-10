const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path")

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/client/index.html",
  filename: "./index.html"
});
const configCommon = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve("dist/client"),
    filename: "[name].js"
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
  },
  plugins: [htmlWebpackPlugin]
};

module.exports = (env,argv) => {
 	const IS_DEVELOPMENT = (argv.mode === "development");
	var configOptional = {};
	if(IS_DEVELOPMENT == true){
	//if(false){
		configOptional = {
			devServer: {
				historyApiFallback: true,
				inline: true,
				open: true,
				host: 'localhost',
				port: 8080,
				proxy: {
					'/api/**': {
						target: 'http://0.0.0.0:3000',
						secure: false,
						logLevel: 'debug'
					}
				}
			}
		};
	} else {
		// nothing yet.
	}
	
	return {...configCommon, ...configOptional};
	//return configCommon;
}; 
