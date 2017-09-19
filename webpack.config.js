const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: __dirname,
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  externals: [nodeExternals()],
};
