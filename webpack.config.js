const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const dotenv = require("dotenv")
const InlineChunkHtmlPlugin = require("./vendor/inlinePlugin")

module.exports = (e, argv) => {
  const env = dotenv.config({ path: ".env" }).parsed

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  return {
    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: argv.mode === "production" ? false : "inline-source-map",

    entry: {
      app: "./ui/ui.tsx", // The entry point for your UI code
      figma: "./plugin/main.ts" // The entry point for your plugin code
    },

    module: {
      rules: [
        // Converts TypeScript code to JavaScript
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        },
        // { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },

        // Enables including CSS by doing "import './file.css'" in your TypeScript code
        // { test: /\.css$/, loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },

        // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
        {
          test: /\.(png|jpg|gif|webp|svg)$/,
          loader: "url-loader",
          exclude: /node_modules/
        }
      ]
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        // add as many aliases as you like! 
        '@constants': path.resolve(__dirname, 'constants'),
        '@components': path.resolve(__dirname, 'ui/components'),
      }
      // modules: ['/node_modules'],
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist") // Compile into a folder called "dist"
    },

    // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
    plugins: [
      new webpack.DefinePlugin(envKeys), // This sets up env variables
      new HtmlWebpackPlugin({
        template: "./ui/ui.html",
        filename: "ui.html",
        inlineSource: ".(js)$",
        chunks: ["ui"]
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/])
    ]
  }
}
