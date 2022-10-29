const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerWebpackPlugin =  require('css-minimizer-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@styles': path.resolve(__dirname, 'src/styles')
        },

    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },

            {
                test: /\.html$/,
                use: [
                    { loader: 'html-loader' }
                ]
            },

            {
              test: /\.(s[ac]ss|css)$/,
              use: [
                'style-loader',
                'css-loader',
                'sass-loader'
              ]
            }
        ],
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),

        new miniCssExtractPlugin({
          filename: '[name].css',
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new cssMinimizerWebpackPlugin(),
            new terserWebpackPlugin(),
        ]
    }
}