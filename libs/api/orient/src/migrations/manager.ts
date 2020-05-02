import { ODatabaseSession } from 'orientjs';

const MigrationManager = require('orientjs/lib/migration/manager');

/**
 * orientjs MigrationManager helpers
 *
 * Refactoring to work with TypeScript without directory of files so you can compile it with webpack
 */

/**
* List all the available migrations.
*
* @promise {String[]} The names of the available migrations.
*/
// MigrationManager.prototype.listAvailable = function () {
//   return fs.readdirAsync(this.dir)
//     .bind(this)
//     .filter(function (filename) {
//       return /^m(\d+)_(\d+)\_(.*)\.[jt]s$/.test(filename);
//     })
//     .map(function (filename) {
//       return filename.slice(0, -3);
//     });
// };



export function migration(name, queries) {
  return {
    name: name,
    up: async function (db: ODatabaseSession) {
      for (let query of queries) {
        if (!query[0]) continue;
        query = query[0];
        console.log('EXEC:', query);
        await db.batch(query).all().then(data => {
          console.log('SUCCESS', query, data);
        },
          err => {
            console.log('ERROR', query, err);
          });
      }
    },
    down: async function (db: ODatabaseSession) {
      for (let query of reverse(queries)) {
        if (!query[1]) continue;
        query = query[1];
        console.log('EXEC:', query);
        await db.batch(query).all().then(data => {
          console.log('SUCCESS', query, data);
        },
          err => {
            console.log('ERROR', query, err);
          });
      }
    }
  }
}
/**
 * helpers
 */
function reverse(input) {
  const ret = new Array;
  for (let i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
}
