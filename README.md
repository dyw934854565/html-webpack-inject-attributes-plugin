add custom attributes to inject tags

### install

```javascript
   npm install html-webpack-inject-attributes-plugin
```

### use

*** add to all inject tags
```javascript
    plugins = [
        new htmlWebpackInjectAttributesPlugin({
            frominject: "true"
        })  // Object, key should be string, value can be string or function
    ]
```

*** add to chunks in HtmlWebpackPlugin
by add attributes to HtmlWebpackPlugin

```javascript
    plugins = [
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            chunks: ['index'],
            template: resolve('../index.template.html'),
            attributes: {
                'data-src': function (node) { return node.attributes.src }
            },
        })  // Object, key and value should be string
    ]
```