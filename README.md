html-webpack-inject-attributes-plugin
=======================

[![NPM version][npm-image]][npm-url]
![][david-url]
![][dt-url]
![][license-url]


add custom attributes to inject tags

### install

```javascript
npm install html-webpack-inject-attributes-plugin -D
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

return false to prevent some tags add attributes

```javascript
    plugins = [
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            chunks: ['index'],
            attributes: {
                'data-src': function (tag, compilation, index) {
                    if (tag.tagName === 'script') {
                        return true;
                    }
                    return false;
                }
            },
        })
    ]
```

style tags do not be affected

### LICENSE

[MIT License](https://raw.githubusercontent.com/leftstick/unminified-webpack-plugin/master/LICENSE)


[npm-url]: https://npmjs.org/package/html-webpack-inject-attributes-plugin
[npm-image]: https://badge.fury.io/js/html-webpack-inject-attributes-plugin.png
[david-url]: https://david-dm.org/leftstick/html-webpack-inject-attributes-plugin.png
[dt-url]:https://img.shields.io/npm/dt/html-webpack-inject-attributes-plugin.svg
[license-url]:https://img.shields.io/npm/l/html-webpack-inject-attributes-plugin.svg
