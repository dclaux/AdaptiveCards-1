const path = require("path");

module.exports = (env, argv) => {
	const mode = argv.mode || 'development';
	const devMode = mode === "development";

	console.info('running webpack with mode:', mode);

	return {
		mode: mode,
		target: "web",
		entry: {
			"adaptivecards-templating": "./src/adaptivecards-templating.ts"
		},
		output: {
			path: path.resolve(__dirname, "./dist"),
			filename: devMode ? "[name].js" : "[name].min.js",
			libraryTarget: "umd",
			library: "ACData",
			globalObject: "this"
		},
		devtool: devMode ? "inline-source-map" : "source-map",
		devServer: {
			contentBase: './dist'
		},
		externals: {
			"adaptive-expressions": {
				commonjs2: "adaptive-expressions",
				commonjs: "adaptive-expressions",
				root: "AEL"
			}
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
			]
		},
		externals: {
			"adaptivecards-templating": {
				commonjs2: "adaptivecards-templating",
				commonjs: "adaptivecards-templating",
				root: "ACData"
			}
		}
	};
}
