const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader', // Resolves CSS imports
          'sass-loader', // Compiles SCSS to CSS
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
  ],
  stats: {
    errorDetails: true,
  },
  devServer: {
    historyApiFallback: true, // Support react-router
    contentBase: path.join(__dirname, 'public'),
    port: 3001,
  },
};