var assign = require("lodash.assign");
var forEach = require("lodash.foreach");

function htmlWebpackInjectAttributesPlugin(options) {
    this.options = options;
}

htmlWebpackInjectAttributesPlugin.prototype.apply = function(compiler) {
    var self = this;
    compiler.hooks.compilation.tap("htmlWebpackInjectAttributesPlugin", function (compilation) {
        function addAttr(tags, key, val) {
            if (!tags || !tags.length) {
                return;
            }
            forEach(tags, function(tag, index) {
                var value = val;
                if (typeof val === "function") {
                    value = val(tag, compilation, index);
                }
                tag.attributes[key] = value;
            });
        }

        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync("htmlWebpackInjectAttributesPlugin", function(htmlPluginData, callback) {
            var options = assign({}, self.options, htmlPluginData.plugin.options && htmlPluginData.plugin.options.attributes);
            forEach(options, function(val, key) {
                if (typeof val !== "string" && typeof val !== "function") {
                    return;
                }
                addAttr(htmlPluginData.head, key, val);
                addAttr(htmlPluginData.body, key, val);
            });
            callback(null, htmlPluginData);
        });
    });
};

module.exports = htmlWebpackInjectAttributesPlugin;