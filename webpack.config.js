var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    calculator: './script/setup.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '/script/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css!sass')        
      },
      {
        test: /\.(css|eot|ttf|woff)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          query: { 
            name: 'style/type/[name]-[hash:6].[ext]',
            publicPath: '../',
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '/style/calculator.css',
      allChunks: true
    })
  ]
};