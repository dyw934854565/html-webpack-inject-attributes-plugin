declare module 'html-webpack-inject-attributes-plugin' {
  import webpack from "webpack";
  
  class HtmlWebpackInjectAttributesPlugin {
    apply(compiler: webpack.Compiler): void;
    constructor(options?: any);
  }
  export = HtmlWebpackInjectAttributesPlugin
}