const fs = require('fs')
const url = require('url')
const path = require('path')

module.exports = {
  baseUrl: "http://129.28.187.206:3001",
  makeDir: function (dirpath) {
    if (!fs.existsSync(dirpath)) {
      var pathtmp;
      dirpath.split("/").forEach(function(dirname) {
        if (pathtmp) {
          pathtmp = path.join(pathtmp, dirname);
        }
        else {
          //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
          if(dirname){
            pathtmp = dirname;
          }else{
            pathtmp = "/"; 
          }
        }
        if (!fs.existsSync(pathtmp)) {
          if (!fs.mkdirSync(pathtmp)) {
            return false;
          }
        }
      });
    }
    return true;
  },
  getUrlDir: function (path) {
    let dir = url.parse(path)
    return dir.pathname
  }
}