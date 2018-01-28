// html-webpack-inject-attributes-plugin

function MyPlugin(options) {
    this.options = options;
}

MyPlugin.prototype.apply = function (compiler) {
    var self = this;
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
            var options = Object.assign({}, self.options, htmlPluginData.plugin.options.attributes || {});
            if (options && typeof options === 'object') {
                for (var key in options) {
                    var val = options[key];
                    if (typeof val !== 'string' && typeof val !== 'function') {
                        return;
                    }
                    for (var headI = htmlPluginData.head.length - 1; headI >= 0; headI--) {
                        var value = val;
                        if (typeof val === 'function') {
                            value = val(htmlPluginData.head[headI], compilation);
                        }
                        htmlPluginData.head[headI].attributes[key] = value;
                    }
                    for (var bodyI = htmlPluginData.body.length - 1; bodyI >= 0; bodyI--) {
                        var value = val;
                        if (typeof val === 'function') {
                            value = val(htmlPluginData.body[bodyI], compilation);
                        }
                        htmlPluginData.body[bodyI].attributes[key] = value;
                    }
                }
            }
            callback(null, htmlPluginData);
        });
    });

};

module.exports = MyPlugin;