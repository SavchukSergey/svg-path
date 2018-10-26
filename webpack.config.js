const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        "app": ['./src/app.ts'],
        "path": ['./src/path.ts'],
    },
    devtool: "source-map",
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist/*"]),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: ["app"]
        })
    ],
    resolve: {
        extensions: [".js", ".ts"]
    },
    output: {
        filename: './[name]-compiled.js',
        path: path.resolve(__dirname, 'dist')
    }
};