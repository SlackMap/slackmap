import {migration} from '../manager';

module.exports = migration(
    "Log class",
    [
        [
            'CREATE CLASS Log',
            'DROP CLASS Log'
        ],
        [
            'CREATE PROPERTY Log.time DATETIME',
            'DROP PROPERTY Log.time'
        ],
        [
            '',
            'DELETE FROM Log'
        ],

    ]
)

