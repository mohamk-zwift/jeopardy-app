// Source for webpack config file: https://webpack.js.org/configuration/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  // using multiple entry points
  entry: {
    app: './src/js/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Jeopardy App',
      template: './src/html/react-index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.s[ca]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      }
    ],
  },
  // this will add the extensions to a file so the extension won't have to be specified when importing files
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
