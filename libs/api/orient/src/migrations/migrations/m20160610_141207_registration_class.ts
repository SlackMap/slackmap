import {migration} from '../manager';

module.exports = migration(
    "Registration class",
    [
        [
            'CREATE CLASS EventRegistration',
            'DROP CLASS EventRegistration'
        ],
        [
            'CREATE PROPERTY EventRegistration.created_at DATETIME',
            'DROP PROPERTY EventRegistration.created_at'
        ],
        [
            '',
            'DELETE FROM EventRegistration'
        ],

    ]
)

