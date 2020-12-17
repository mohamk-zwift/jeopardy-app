//using `merge`: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // contentBase: Tell the server where to serve content from
  devServer: {
    contentBase: './dist',
    port: 9000,
  },
});
