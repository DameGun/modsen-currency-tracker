import DotenvWebpackPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  target: 'web',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: './public/index.html',
      favicon: './src/assets/icons/logo.svg',
    }),
    new DotenvWebpackPlugin({
      systemvars: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
