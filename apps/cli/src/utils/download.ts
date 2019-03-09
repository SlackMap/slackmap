// function download(fileUrl, apiPath, callback) {
//   var url = require('url'),
//       http = require('http'),
//       fs = require('fs'),
//       p = url.parse(fileUrl),
//       timeout = 10000;

//   var file = fs.createWriteStream(apiPath);

//   var timeout_wrapper = function( req ) {
//       return function() {
//           console.log('abort');
//           req.abort();
//           callback("File transfer timeout!");
//       };
//   };


//   console.log('before');

//   var request = http.get(fileUrl).on('response', function(res) {
//       console.log('in cb');
//       var len = parseInt(res.headers['content-length'], 10);
//       var downloaded = 0;

//       res.on('data', function(chunk) {
//           file.write(chunk);
//           downloaded += chunk.length;
//           const isWin = false;
//           process.stdout.write("Downloading " + (100.0 * downloaded / len).toFixed(2) + "% " + downloaded + " bytes" + isWin ? "\033[0G": "\r");
//           // reset timeout
//           clearTimeout( timeoutId );
//           timeoutId = setTimeout( fn, timeout );
//       }).on('end', function () {
//           // clear timeout
//           clearTimeout( timeoutId );
//           file.end();
//           console.log(fileUrl + ' downloaded to: ' + apiPath);
//           callback(null);
//       }).on('error', function (err) {
//           // clear timeout
//           clearTimeout( timeoutId );
//           callback(err.message);
//       });
//   });

//   // generate timeout handler
//   var fn = timeout_wrapper( request );

//   // set initial timeout
//   var timeoutId = setTimeout( fn, timeout );
// }
