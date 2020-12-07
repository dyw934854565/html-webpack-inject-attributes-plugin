var alterAssetTags = require("./alterAssetTags");

var mockPlugin = function mockPlugin(options) {
  return {
    options: options
  };
};
var mockHtmlPluginData = function mockHtmlPluginData(options, head, body) {
  return {
    plugin: {
      options: options
    },
    head: head,
    body: body
  };
};
test('add tag and callback', function() {
  var compilation = {};
  var plugin = mockPlugin({async: true})
  var htmlPluginData = mockHtmlPluginData(
    {
      attributes: {
        defer: true
      }
    },
    [
      {
        tagName: "script",
        attributes: {}
      }
    ],
    [
      {
        tagName: "script",
        attributes: {}
      }
    ]
  );
  var cb = jest.fn()
  alterAssetTags.call(plugin, compilation, htmlPluginData, cb);
  expect(cb).toHaveBeenNthCalledWith(1, null, htmlPluginData);
  expect(htmlPluginData.body[0].attributes.async).toBe(true);
  expect(htmlPluginData.body[0].attributes.defer).toBe(true);
  expect(htmlPluginData.head[0].attributes.async).toBe(true);
  expect(htmlPluginData.head[0].attributes.defer).toBe(true);
})

test("object", async function() {
  var obj = {a: 'a', b: 'b'}
  var compilation = {};
  var plugin = mockPlugin();
  var htmlPluginData = mockHtmlPluginData(
    {
      attributes: {
        'data-json': obj
      }
    },
    [
      {
        tagName: "script",
        attributes: {}
      }
    ]
  );

  alterAssetTags.call(plugin, compilation, htmlPluginData, jest.fn());
  expect(htmlPluginData.head[0].attributes["data-json"]).toBe(
    JSON.stringify(obj)
  );
});

test("function", async function() {
  var fn = jest.fn(function(tag) {
    if (tag.tagName === "script") {
      return true;
    }
    return false;
  });
  var compilation = {};
  var plugin = mockPlugin();
  var htmlPluginData = mockHtmlPluginData(
    {
      attributes: {
        async: fn
      }
    },
    [
      {
        tagName: "script",
        attributes: {}
      },
      {
        tagName: "link",
        attributes: {}
      }
    ]
  );
  alterAssetTags.call(plugin, compilation, htmlPluginData, jest.fn());
  expect(htmlPluginData.head[0].attributes.async).toBe(true);
  expect(htmlPluginData.head[1].attributes.async).toBe(false);

  expect(fn).toHaveBeenNthCalledWith(1, htmlPluginData.head[0], compilation, 0);
  expect(fn).toHaveBeenNthCalledWith(2, htmlPluginData.head[1], compilation, 1);
});
