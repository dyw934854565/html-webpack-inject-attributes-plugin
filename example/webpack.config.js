const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin')

module.exports = {
    entry: './index.js',
    plugins:[
        new HtmlWebpackPlugin(),
        new htmlWebpackInjectAttributesPlugin({
            async: true,
        })
    ]
}