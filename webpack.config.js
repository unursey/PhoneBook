const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const target = mode === "development" ? "web" : "browserslist"; // автопрефикс
const devtool = mode === "development" ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool, // в prodaction не нужен. Это способ связать минифицированный файл с файлами, из которых он получился.
  devServer: {
    hot: true, // перезагружает страницу, если произошли изменения
  },
  entry: ["@babel/polyfill", "./src/script.js"],
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name][contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // позволяет загружать css в js
          "postcss-loader", // доюавляем префиксы
          "sass-loader", // выполняется с конца! сначала собираем все scss файлы в один css
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
