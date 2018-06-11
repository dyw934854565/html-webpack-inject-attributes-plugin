add custom attributes to inject tags

### install

```javascript
   npm install html-webpack-inject-attributes-plugin
```

### use

please use it after `html-webpack-plugin`, especially in webpack2+.

add to all inject tags
```javascript
    plugins = [
        new htmlWebpackInjectAttributesPlugin({
            inject: "true",
            async: true,
            test: {}
        })  // Object, key should be string, value can be string or function
    ]
```
you got

```html
    <script type="text/javascript" src="index.js" inject="true" async test="{}"></script>
```

add to chunks in HtmlWebpackPlugin
by add attributes to HtmlWebpackPlugin

```javascript
    plugins = [
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            chunks: ['index'],
            attributes: {
                'data-src': function (tag) { return tag.attributes.src }
            },
        })  // Object, key and value should be string
    ]
    /**
     *  if value is a function, got three arguments。
     *  1、tag, ast of tag node
     *  2、compilation, you can get webpack build hash by compilation.hash
     *  3、index, index of trunks
    **/
```

you got

```html
    <script type="text/javascript" src="index.js" data-src="index.js" inject="true"></script>
```

### License

MIT