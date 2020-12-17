// using `merge`: https://github.com/survivejs/webpack-merge
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, { mode: 'production' });
