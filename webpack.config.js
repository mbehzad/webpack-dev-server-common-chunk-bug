const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: false,
  },
  entry: {
    a: "./src/a.js", // has dependency to utils
    b: "./src/b.js", // has dependency to utils
    c: "./src/c.js", // has no common dependency
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  mode: "development",

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common",
          filename: "common.js",
          chunks: "initial",
          minChunks: 2,
          // Minimum size, in bytes, for a chunk to be generated.
          minSize: 0, // This is example is too small to create commons chunks
        },
      },
    },
  },

}