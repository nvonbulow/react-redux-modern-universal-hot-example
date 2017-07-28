/* eslint-disable no-var */
require('babel-polyfill');

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

var outputPath = path.resolve(__dirname, '../dist');

var babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc')));

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      './src/client.jsx'
    ]
  },
  output: {
    path: outputPath,
    filename: 'assets/[name]-[hash].js',
    chunkFilename: 'assets/[name]-[chunkhash].js',
    publicPath: `http://${host}:${port}/`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelrc
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: {
                // See https://github.com/postcss/postcss-loader for details
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: true,
        mangle: true,
      }
    })
    // webpack isomorphic tools
  ]
};
