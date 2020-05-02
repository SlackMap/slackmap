import './manager';
import { OrientDBClient, Migration } from 'orientjs';
import { resolve } from 'path';
const result = require('dotenv').config()
if (result.error) {
  throw result.error
}
import { renameSync, writeFileSync } from "fs";

const args = process.argv;
const action = args[2];
const number = parseInt(args[3], 10);

async function run() {
    const client = new OrientDBClient({
      host: process.env.ORIENTDB_HOST,
      port: parseInt(process.env.ORIENTDB_PORT, 10),
    });

    await client.connect()

    const db = await client.session({
      username: process.env.ORIENTDB_DB_USERNAME,
      password: process.env.ORIENTDB_DB_PASSWORD,
      name: process.env.ORIENTDB_DB_NAME,
    });

    const dir = resolve(__dirname, 'migrations');

    const manager = new Migration.Manager({
        db,
        dir
    });

    if(action === 'list') {
        const list = await manager.list()
        console.log('')
        console.log('Waiting migrations: ', list.length)
        for(const name of list) {
            console.log('    ', name)
        }
        console.log('')
    } else if(action === 'up') {
        let list;
        if(number) {
            list = await manager.up(number)
        } else {
            list = await manager.up()
        }
        console.log('')
        console.log('Applied migrations', list.length)
        for(const name of list) {
            console.log('    ', name, 'OK')
        }
        console.log('')
    } else if(action === 'down') {
        const list = await manager.down(number || 1)
        console.log('')
        console.log('Reverted migrations', list.length)
        for(const name of list) {
            console.log('    ', name, 'OK')
        }
        console.log('')
    } else if(action === 'create') {
        // throw Error('TODO: create in .ts in ./src ');
        const name = args[3];
        if(!name) {
          console.error('name is required');
          process.exit(1);
        }
        const fileName = await manager.create(name)
        const tsFileName = fileName.substr(0, fileName.length-2)+'ts'
        renameSync(fileName, tsFileName);
        writeFileSync(tsFileName, tpl(name), 'utf8');
        console.log('')
        console.log('SUCCESS: migration created !!!')
        console.log(tsFileName)
        console.log('')
    } else {
        console.log(`Command "${action}" Not Found`);
        console.log(`Available commands:`);
        console.log(`npm run migrations create`);
        console.log(`npm run migrations list`);
        console.log(`npm run migrations up [number]`);
        console.log(`npm run migrations down [number]`);
    }

    process.exit(0);
}
run();

export default function() {}

function tpl(name: string) {
return `import {migration} from '../manager';

module.exports = migration(
  "${name.replace(/-/g, ' ')}",
  [
    // UP commands
    [
      \`\`,
    ],
    // DOWN commands
    [
      \`\`,
    ]
  ]
)
`
}
