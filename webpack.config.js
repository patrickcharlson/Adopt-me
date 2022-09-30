const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;


  return {
    entry: "./src/index.jsx",
    devtool: isDevelopment && "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"]
    },
    devServer: {
      port: 3000,
      compress: true,
      historyApiFallback: true,
      open: true,
      client: {
        overlay: true
      }
    },
    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader", "postcss-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        inject: true
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: "assets/css/[name].[contenthash:8].css",
        chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development")
      })
    ].filter(Boolean)
  };
};
