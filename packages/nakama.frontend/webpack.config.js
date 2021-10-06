const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 9500
  },
  entry: { index: './src/index.tsx' },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      chunksSortMode: 'manual',
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    mainFiles: ['index']
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  }
};
