// html-webpack-inject-attributes-plugin
var assign = require('lodash.assign');
var foreach = require('lodash.foreach');

function MyPlugin(options) {
    this.options = options;
}

MyPlugin.prototype.apply = function (compiler) {
    var self = this;
    compiler.plugin('compilation', function (compilation) {
        function addAttr(tags, key, val) {
            if (!tags || !tags.length) {
                return;
            }
            forEach(tags, function (tag, index) {
                var value = val;
                if (typeof val === 'function') {
                    value = val(tag, compilation, index);
                }
                tag.attributes[key] = value;
            });
        }
        compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
            var options = assign({}, self.options, htmlPluginData.plugin.options && htmlPluginData.plugin.options.attributes);
            forEach(options, function(val, key) {
                if (typeof val !== 'string' && typeof val !== 'function') {
                    return;
                }
                addAttr(htmlPluginData.head, key, val);
                addAttr(htmlPluginData.body, key, val);
            });
            callback(null, htmlPluginData);
        });
    });

};

module.exports = MyPlugin;