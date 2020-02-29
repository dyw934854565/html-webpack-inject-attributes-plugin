html-webpack-inject-attributes-plugin
=======================

[![NPM Version][npm-image]][npm-url]
[![Dependency Status][david-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Download Status][dt-image]][npm-url]
[![MIT License][license-image]][license-url]


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

[MIT License][license-url]


[npm-url]: https://npmjs.org/package/html-webpack-inject-attributes-plugin
[npm-image]: https://badge.fury.io/js/html-webpack-inject-attributes-plugin.png
[david-image]: https://david-dm.org/leftstick/html-webpack-inject-attributes-plugin.png
[dt-image]: https://img.shields.io/npm/dt/html-webpack-inject-attributes-plugin.svg
[travis-image]: https://travis-ci.com/dyw934854565/html-webpack-inject-attributes-plugin.svg?branch=master
[travis-url]: https://travis-ci.com/dyw934854565/html-webpack-inject-attributes-plugin
[license-image]: https://img.shields.io/npm/l/html-webpack-inject-attributes-plugin.svg
[license-url]: https://raw.githubusercontent.com/dyw934854565/html-webpack-inject-attributes-plugin/master/LICENSE