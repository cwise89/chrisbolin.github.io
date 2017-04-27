const { resolve } = require('path');
const webpack = require('webpack');

const baseExports = {
  context: resolve(__dirname, 'src'),

  entry: './index.js',

  output: {
    filename: 'bundle.js', // the output bundle
    path: __dirname,
    publicPath: '/' // necessary for HMR to know where to load the hot update chunks
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
    ],
  },
};

const devExports = {
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:8080',
    // bundle client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server',
    // only hot reload for successful updates
    './index.js'
  ],

  devtool: 'inline-source-map',

  devServer: {
    hot: true, // enable HMR on the server
    contentBase: __dirname, // match the output path
    publicPath: '/' // match the output `publicPath`
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in browser console
  ],
};

module.exports = function (env) {
  const dev = env !== 'prod'; // use dev mode unless explict
  return Object.assign(baseExports, (dev ? devExports : {}));
};