const path = require('path');
const nodeExternals = require('webpack-node-externals');

const mode = 'production';
const entryPoint = './index.ts';
const outputPath = path.resolve(__dirname, './dist');
const nodeModulesPath = path.resolve(__dirname, './node_modules');
const outputFilename = 'index.cjs';
const extensions = ['.ts', '.tsx', '.js'];

module.exports = {
    target: 'node',
    entry: {
        main: entryPoint,
    },
    output: {
        path: outputPath,
        filename: outputFilename,
    },
    mode,
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    resolve: {
        modules: ['node_modules'],
        extensions
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                include: [__dirname],
                exclude: [
                    nodeModulesPath,
                    outputPath,
                ]
            },
        ],
    },
    experiments: {
        topLevelAwait: true
    }
};