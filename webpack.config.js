const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const config = {
    mode: env.mode,
    entry: {
      app: './src/app.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve('dist')
    },
    module: {
      rules: [
        {
          test: /\.(s?[ac])ss$/,
          use: [
            env.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: '/node_modules',
          loader: 'babel-loader'
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)$/,
          loader: 'file-loader'
        }
      ]
    },
    devServer: {
      host: 'localhost',
      port: 3100,
      publicPath: '/dist/',
      open: true,
      openPage: 'dist/',
      contentBase: './src',
      watchContentBase: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  };

  if (env.mode === 'production') {
    config.optimization = config.optimization || {};
    config.optimization.minimizer = (config.optimization.minimizer || []).concat(
      new UglifyJsPlugin()
    );

    config.plugins = (config.plugins || []).concat([
      new MiniCssExtractPlugin({
        chunkFilename: '[id].css',
        filename: '[name].css'
      })
    ]);
  }

  if (env.mode === 'development') {
    config.plugins = (config.plugins || []).concat([]);
  }

  return config;
};
