import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';

export default merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});
