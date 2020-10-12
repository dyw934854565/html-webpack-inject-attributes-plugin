import webpack from 'webpack';

declare module 'html-webpack-inject-attributes-plugin' {
  class HtmlWebpackInjectAttributesPlugin {
    apply(compiler: webpack.Compiler): void;
    constructor(options?: any): void;
  }
  export = HtmlWebpackInjectAttributesPlugin
};