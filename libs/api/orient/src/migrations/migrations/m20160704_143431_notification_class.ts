import {migration} from '../manager';

module.exports = migration(
    "Notification class",
    [
        [
            'CREATE CLASS Notification',
            'DROP CLASS Notification'
        ],
        [
            'CREATE PROPERTY Notification.created_at DATETIME',
            'DROP PROPERTY Notification.created_at'
        ],
        [
            'CREATE PROPERTY Notification.updated_at DATETIME',
            'DROP PROPERTY Notification.updated_at'
        ],
        [
            'CREATE PROPERTY Notification.item LINK Item',
            'DROP PROPERTY Notification.item'
        ],
        [
            'CREATE PROPERTY Notification.user LINK User',
            'DROP PROPERTY Notification.user'
        ],
        [
            'CREATE PROPERTY Notification.actors LINKLIST User',
            'DROP PROPERTY Notification.actors'
        ],
        [
            'CREATE PROPERTY Notification.actors_count INTEGER',
            'DROP PROPERTY Notification.actors_count'
        ],
        [
            'CREATE PROPERTY Notification.opened BOOLEAN',
            'DROP PROPERTY Notification.opened'
        ],
        [
            'CREATE PROPERTY Notification.action STRING',
            'DROP PROPERTY Notification.action'
        ],
        [
            'CREATE PROPERTY Notification.relation STRING',
            'DROP PROPERTY Notification.relation'
        ],

        [
            'CREATE INDEX Notification.action NOTUNIQUE',
            'DROP INDEX Notification.action'
        ],
        [
            'CREATE INDEX Notification.created_at NOTUNIQUE',
            'DROP INDEX Notification.created_at'
        ],
        [
            'CREATE INDEX Notification.updated_at NOTUNIQUE',
            'DROP INDEX Notification.updated_at'
        ],
        [
            'CREATE INDEX notification_unique_index ON Notification (action, item, user) UNIQUE',
            'DROP INDEX notification_unique_index'
        ],
        [
            '',
            'DELETE FROM Notification'
        ],

    ]
)

