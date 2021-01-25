var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/api.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'swell-js.js',
    publicPath: 'dist',
    library: 'swell',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              sourceType: 'unambiguous',
            },
          },
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
  },
  plugins: [
      new CleanWebpackPlugin()
  ],
  externals:[
    /^lodash\/.+$/
  ]
};
