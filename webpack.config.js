const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  // mode: "development || "production",
	// output: {
		// webassemblyModuleFilename: "[modulehash].wasm",
		// publicPath: "js/"
	// },
	module: {
		rules: [
			{
				test: /\.wasm$/,
				type: "webassembly/experimental"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
		]
  },
  plugins: [htmlPlugin],
	optimization: {
		occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
	}
};