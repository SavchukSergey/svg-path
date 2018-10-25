const path = require('path');

module.exports = {
    entry: {
        "app": ['./src/app.ts'],
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
    resolve: {
        extensions: [".js", ".ts"]
    },
    output: {
        filename: './[name]-compiled.js',
        path: path.resolve(__dirname, 'dist')
    }
};