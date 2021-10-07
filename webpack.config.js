const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    target: 'web',
    entry: {
      main: path.resolve(__dirname, './src/index.tsx'),
    },
    mode: env.production ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public/',
            to: '.',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        manifest: './public/manifest.json',
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin(envKeys),
    ],
    module: {
      rules: [
        {
          test: [/\.js$/, /\.tsx?$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
            },
          ],
          sideEffects: true,
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: env.production
        ? {
            chunks: 'async',
          }
        : false,
    },
    devServer: {
      contentBase: 'src',
      hot: true,
      open: true,
      inline: true,
      port: 3000,
    },
  };
};
