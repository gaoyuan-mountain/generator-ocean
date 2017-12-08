const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const packageInfo = require('./package.json');

module.exports = {
  devtool: 'source-map',
  entry: {
    browser: path.join(__dirname, 'app/index.tsx'),
    common: ['react', 'react-router']
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name]-[chunkhash].min.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new Clean(['./build']),
    new ProgressBarPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: packageInfo.title,
      version: packageInfo.version,
      template: 'app/index.html',
      filename: 'index.html'
      // favicon: 'favicon.ico',
    }),
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      chunks: ['browser']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        include: path.resolve(__dirname, './app'),
        use: [{ loader: 'react-hot-loader/webpack' }, { loader: 'awesome-typescript-loader' }]
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('css-loader!autoprefixer-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=i/[name].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader?name=i/[path][name].[ext]'
      }
    ]
  }
};
