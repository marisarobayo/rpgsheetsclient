const fs = require('fs');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack,
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true
  },
  devServer: {
    /*https: {
      key: fs.readFileSync('./rpgsheets.key'),
      cert: fs.readFileSync('./rpgsheets.crt')
    }*/
  }
  //runtimeCompiler: true
}