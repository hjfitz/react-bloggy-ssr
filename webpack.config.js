const path = require('path');

const src = path.join(__dirname, 'src');

const client = {
  entry: ['@babel/polyfill', path.join(src, 'client', 'spa', 'router.jsx')],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'client.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};

const server = {
  entry: ['@babel/polyfill', path.join(src, 'server', 'app.js')],
  target: 'node',
  output: {
    path: __dirname,
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};

module.exports = [client, server];
