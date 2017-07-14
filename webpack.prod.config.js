const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/main.js'
  ],

  output: {
    path: __dirname + "/public",
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
           presets: ['es2016', 'react']
        }
      },
      { test: /\.css/,
        loaders: ['style-loader', 'css-loader']},
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
    ]
  }
}
