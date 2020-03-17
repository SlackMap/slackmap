const http = require('https');
const fs = require('fs');

export function download(sourceUrl, destinationPath) {
  return new Promise((resolve, reject) => {

    const file = fs.createWriteStream(destinationPath);
    http.get(sourceUrl, function (response) {
      response.pipe(file);
      response.on('end', function () {
        file.close(resolve);
      }).on('error', function (err) {
        fs.unlink(destinationPath);
        reject(err.message);
      });
    });

  })

}
