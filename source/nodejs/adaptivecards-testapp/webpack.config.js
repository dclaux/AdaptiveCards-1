const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
	const mode = argv.mode || 'development';
	const devMode = mode === "development";

	console.info('running webpack with mode:', mode);

	return {
		mode: mode,
		target: "web",
		entry: {
			"adaptivecards-testapp": "./src/app.ts",
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: devMode ? "[name].js" : "[name].min.js",
			libraryTarget: "umd",
			library: "ACTestApp",
			globalObject: "this"
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"]
		},
		module: {
			rules: [{
					test: /\.ts$/,
					loader: "ts-loader",
					exclude: /(node_modules|__tests__)/
				}
				/*
				{
					test: /\.css$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader'
					]
				}
				*/
			]
		},
		plugins: [
			new CopyWebpackPlugin(
				{
					patterns: [
						{
							from: 'src/*.css',
							to: '../lib/',
							flatten: true
						},
						{
							from: 'src/*.css',
							to: '../dist/',
							flatten: true
						},
						{
							from: 'src/extensions-catalog.json',
							to: '../dist/',
							flatten: true
						}
					]
				}
			),
            new HtmlWebpackPlugin({
				title: "Adaptive Cards test application",
				template: "./index.html"
			})
			/*
            new MiniCssExtractPlugin({
				filename: '[name].css'
			})
			*/
		],
		externals: {
			"adaptivecards": {
				commonjs2: "adaptivecards",
				commonjs: "adaptivecards",
				root: "AdaptiveCards"
			},
			"adaptive-expressions": {
				commonjs2: "adaptive-expressions",
				commonjs: "adaptive-expressions",
				root: "AEL"
			},
			"adaptivecards-templating": {
				commonjs2: "adaptivecards-templating",
				commonjs: "adaptivecards-templating",
				root: "ACData"
			}
		}
	}
}
