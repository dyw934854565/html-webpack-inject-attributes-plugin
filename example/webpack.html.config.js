const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin')

module.exports = {
    mode: 'development',
    entry: './index.js',
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'async.html',
            attributes: {
                async: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'defer.html',
            attributes: {
                defer: true
            }
        }),
        new htmlWebpackInjectAttributesPlugin({
            common: 'true'
        })
    ]
}