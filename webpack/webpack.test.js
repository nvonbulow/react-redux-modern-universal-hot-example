var webpack = require('webpack');
var path = require('path');

var projectRoot = path.resolve(__dirname, '..');

module.exports = {
  devtool: 'inline-source-map',
  context: projectRoot,
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }
      },
      {
        test: /\.js?x$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        use: [
          'json-loader',
          'strip-json-comments-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              expanded: true,
              sourceMap: true
            }
          }
        ]
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
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.NoEmitOnErrorsPlugin(),new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false
    })
  ]
};
