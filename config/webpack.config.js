const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '..');

module.exports = {
  entry: path.join(ROOT_PATH, 'src/index.tsx'),
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
          test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: '[local]__[hash:base64:5]',
                }
             },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT_PATH, 'public/index.html'),
    }),
  ],
  devServer: {
    static: path.join(ROOT_PATH, 'dist'),
    compress: true,
    port: 3000,
  },
};
