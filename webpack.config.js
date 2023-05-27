const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  // mode: "development",
  mode: "development",

  // devtool: "source-map",

  context: __dirname,
  entry: {
    main: ["./src/js/main.js", "./src/scss/style.scss"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },

          "sass-loader",
        ],
      },
      {
        enforce: "pre",
        exclude: /node_modules/,
        test: /\.jsx$/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },

  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery",

    //   includePaths: [
    //     path.resolve('./node_modules')
    //   ]
    // }),

      new MiniCssExtractPlugin({
      filename: "main.css",
    }),
  ],
};
