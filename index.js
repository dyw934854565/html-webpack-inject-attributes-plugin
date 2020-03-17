// html-webpack-inject-attributes-plugin
var alterAssetTags = require('./lib/alterAssetTags')
var safeRequire = require('safe-require')
function htmlWebpackInjectAttributesPlugin(options) {
    this.options = options;
}

htmlWebpackInjectAttributesPlugin.prototype.apply = function (compiler) {
    var self = this;

    if (compiler.hooks) {
        compiler.hooks.compilation.tap("htmlWebpackInjectAttributesPlugin", function (compilation) {
            var alterAssetTagsHook = compilation.hooks.htmlWebpackPluginAlterAssetTags
            if (!alterAssetTagsHook) {
                alterAssetTagsHook = safeRequire('html-webpack-plugin').getHooks(compilation).alterAssetTags
            }
            alterAssetTagsHook.tap("htmlWebpackInjectAttributesPlugin", alterAssetTags.bind(self, compilation));
        });
    } else {
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-alter-asset-tags', alterAssetTags.bind(self, compilation));
        });
    }
};

module.exports = htmlWebpackInjectAttributesPlugin;
