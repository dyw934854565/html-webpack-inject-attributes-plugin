var assign = require("lodash.assign");
var forEach = require("lodash.foreach");

function addAttr(compilation, tags, key, val) {
  if (!tags || !tags.length) {
    return;
  }
  forEach(tags, function(tag, index) {
    var value = val;
    if (typeof val === "function") {
      value = val(tag, compilation, index);
    } else if (typeof val === "object") {
      value = JSON.stringify(val);
    }
    tag.attributes[key] = value;
  });
}
function alterAssetTags(compilation, htmlPluginData, callback) {
  var options = assign(
    {},
    this.options,
    htmlPluginData.plugin.options && htmlPluginData.plugin.options.attributes
  );
  forEach(options, function(val, key) {
    // for html-webpack-plugin 4
    if (htmlPluginData.assetTags) {
      addAttr(compilation, htmlPluginData.assetTags.scripts, key, val);
      addAttr(compilation, htmlPluginData.assetTags.styles, key, val);
    } else {
      addAttr(compilation, htmlPluginData.head, key, val);
      addAttr(compilation, htmlPluginData.body, key, val);
    }
  });

  if (typeof callback === "function") {
    callback(null, htmlPluginData);
  } else {
    return htmlPluginData;
  }
}

module.exports = alterAssetTags;
