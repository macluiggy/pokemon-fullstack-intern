const webpack = require("webpack");
const path = require("path");
const CURRENT_WORKING_DIR = process.cwd() || __dirname;
const HTMLWebpackPlugin = require("html-webpack-plugin");
console.log(CURRENT_WORKING_DIR);

const rulesForJavaScript = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ["babel-loader"],
};
const rulesForTypescript = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
};
const rulesForSass = {
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
};

module.exports = {
  entry: path.resolve(CURRENT_WORKING_DIR, "src/index.tsx"),
  module: {
    rules: [rulesForJavaScript, rulesForTypescript, rulesForSass],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(CURRENT_WORKING_DIR, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({ template: path.resolve("./src/index.html") }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080,
    compress: true,
    static: path.resolve(CURRENT_WORKING_DIR, "./build"),
    hot: true,
  },
};
