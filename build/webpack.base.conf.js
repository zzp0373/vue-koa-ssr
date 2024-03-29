const path = require("path");
const createVueLoaderOptions = require("./vue-loader.conf");

const isDev = process.env.NODE_ENV === "development";

const config = {
  target: "web",
  entry: path.join(__dirname, "../client/client-entry.js"),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "http://127.0.0.1:8001/"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 1024,
          name: "resources/[path][name].[hash:8].[ext]"
        }
      }
    ]
  }
};

module.exports = config;
