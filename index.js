// html-webpack-inject-attributes-plugin
var assign = require('lodash.assign');
var forEach = require('lodash.foreach');

function addAttr(compilation, tags, key, val) {
    if (!tags || !tags.length) {
        return;
    }
    forEach(tags, function (tag, index) {
        var value = val;
        if (typeof val === "function") {
            value = val(tag, compilation, index);
        } else if (typeof val === 'object') {
            value = JSON.stringify(val);
        }
        tag.attributes[key] = value;
    });
}
function alterAssetTags(compilation, htmlPluginData, callback) {
    var options = assign({}, this.options, htmlPluginData.plugin.options && htmlPluginData.plugin.options.attributes);
    forEach(options, function (val, key) {
        addAttr(compilation, htmlPluginData.head, key, val);
        addAttr(compilation, htmlPluginData.body, key, val);
    });

    if (typeof callback === 'function') {
        callback(null, htmlPluginData);
    } else {
        return new Promise(resolve => resolve(htmlPluginData));
    }
}

function htmlWebpackInjectAttributesPlugin(options) {
    this.options = options;
}

htmlWebpackInjectAttributesPlugin.prototype.apply = function (compiler) {
    var self = this;

    if (compiler.hooks) {
        compiler.hooks.compilation.tap("htmlWebpackInjectAttributesPlugin", function (compilation) {
            compilation
                .hooks
                .htmlWebpackPluginAlterAssetTags
                .tap("htmlWebpackInjectAttributesPlugin", alterAssetTags.bind(self, compilation));
        });
    } else {
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-alter-asset-tags', alterAssetTags.bind(self, compilation));
        });
    }
};

module.exports = htmlWebpackInjectAttributesPlugin;