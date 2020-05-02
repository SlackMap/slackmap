import {migration} from '../manager';

module.exports = migration(
    "Post class",
    [
        [
            'CREATE CLASS PostedOn EXTENDS E',
            'DROP CLASS PostedOn'
        ],
        [
            'CREATE CLASS Post EXTENDS Item',
            'DROP CLASS Post'
        ],
        [
            'CREATE PROPERTY Post.updated_at DATETIME',
            'DROP PROPERTY Post.updated_at'
        ],
        [
            'CREATE PROPERTY Post.text STRING',
            'DROP PROPERTY Post.text'
        ],
        [
            'CREATE INDEX Post.updated_at NOTUNIQUE',
            'DROP INDEX Post.updated_at'
        ],
        [
            '',
            'DELETE EDGE PostedOn'
        ],
        [
            '',
            'DELETE VERTEX Post'
        ],

    ]
)

