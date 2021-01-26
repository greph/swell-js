var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/api.ts'),
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
          test: /\.(js|jsx|tsx|ts)$/,
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
      new CleanWebpackPlugin()
  ],
  externals:[
    /^lodash\/.+$/
  ]
};
