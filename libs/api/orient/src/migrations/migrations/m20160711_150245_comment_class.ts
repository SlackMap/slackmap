import {migration} from '../manager';

module.exports = migration(
    "Comment class",
    [
        [
            'CREATE CLASS CommentOf EXTENDS E',
            'DROP CLASS CommentOf'
        ],
        [
            'CREATE CLASS Comment EXTENDS Item',
            'DROP CLASS Comment'
        ],
        [
            'CREATE PROPERTY Comment.updated_at DATETIME',
            'DROP PROPERTY Comment.updated_at'
        ],
        [
            'CREATE PROPERTY Comment.text STRING',
            'DROP PROPERTY Comment.text'
        ],
        [
            'CREATE INDEX Comment.updated_at NOTUNIQUE',
            'DROP INDEX Comment.updated_at'
        ],
        [
            '',
            'DELETE EDGE CommentOf'
        ],
        [
            '',
            'DELETE VERTEX Comment'
        ],

    ]
)

