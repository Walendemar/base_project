/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname, '..');

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  entry: path.join(ROOT_PATH, 'src/index.tsx'),
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(ROOT_PATH, 'src'),
      '@css': path.resolve(ROOT_PATH, 'src/css'),
      '@img': path.resolve(ROOT_PATH, 'src/assets/images'),
    },
  },
  mode: mode,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerWebpackPlugin(),
    ],
  },
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
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'src/assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'src/assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT_PATH, 'public/index.html'),
    }),
    ...(!isProduction ? [new webpack.HotModuleReplacementPlugin()] : []),
  ],
  devServer: {
    static: path.join(ROOT_PATH, 'dist'),
    compress: true,
    port: 3000,
    hot: !isProduction,
  },
};
