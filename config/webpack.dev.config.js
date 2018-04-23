const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
    templateContent: templateContent(),
  })
];

module.exports = require('./webpack.shared.config')({
  srcs: [
    path.join(process.cwd(), 'src')
  ],
  debug: true,
  // Add hot reloading in development
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    path.join(process.cwd(), 'src/index.tsx'),
  ],

  output: {
    filename: 'main.js',
    path: path.join(process.cwd(), 'dist')
  },

  resolve: {
    modules: ['src', 'node_modules']
  },

  plugins: plugins,

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
  }

});

function templateContent() {
  return fs.readFileSync(
    path.resolve(process.cwd(), 'index.html')
  ).toString();
}
