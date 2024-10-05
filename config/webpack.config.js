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
    alias: {
      '@src': path.resolve(ROOT_PATH, 'src'),
      '@css': path.resolve(ROOT_PATH, 'src/css'),
      '@img': path.resolve(ROOT_PATH, 'src/assets/images'),
    },
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
      }
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
