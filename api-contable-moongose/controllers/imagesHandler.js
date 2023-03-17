let fs = require("fs");
let path = require("path");

var dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});

class imageHandler {
  constructor() {}

  async processImage(file, objectType) {
    return new Promise((resolve, reject) => {
      let oldPath = file.path;
      let newPath = "public/" + objectType + "/" + file.filename; //poner directorio en una variable (env?)

      let ext_split = file.filename.split(".");
      let file_ext = ext_split[1];
      if (
        file_ext == "png" ||
        file_ext == "jpg" ||
        file_ext == "gif" ||
        file_ext == "jpeg"
      ) {
        fs.rename(oldPath, newPath, async (err) => {
          if (err) {
            reject(err);
          } else {
            fs.unlink(oldPath, (err) => {
              reject(err);
            });
            resolve(
              "http://localhost:" +
                process.env.APP_PORT +
                "/api/" +
                objectType +
                "/file/" +
                file.filename
            );
          }
        });
      } else {
        reject("Extensión de archivo inválida");
      }
    });
  }
}

module.exports = imageHandler;
