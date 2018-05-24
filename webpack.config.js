const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const P5 = path.join(SRC, 'p5');

module.exports = {
    mode: 'development',
    entry: path.resolve(SRC, 'app.ts'),
    devtool: 'inline-source-map',
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
        extensions: [ '.ts', '.js' ]
    },
    output: {
        filename: 'app.js',
        path: DIST
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(SRC,'index.html')}),
        new CleanWebpackPlugin([DIST]),
        new CopyWebpackPlugin([
            {from: path.resolve(P5,'p5.min.js'), to: DIST},
            {from: path.resolve(P5,'p5.dom.min.js'), to: DIST}
        ])
    ],

    devServer: {
        contentBase: DIST,
        port: 9000
    }
};