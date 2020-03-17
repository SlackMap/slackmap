const targz = require('targz');

export function untargz(src, dest) {
  return new Promise((resolve, reject) => {

    targz.decompress({
        src,
        dest
    }, function(err){
        if(err) {
            reject(err);
        } else {
            resolve("Done!");
        }
    });


  })
}
