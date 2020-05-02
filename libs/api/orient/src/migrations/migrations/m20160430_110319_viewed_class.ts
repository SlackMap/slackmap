import {migration} from '../manager';

module.exports = migration(
    "Viewed class",
    [
        [
            'CREATE CLASS Viewed EXTENDS E',
            'DROP CLASS Viewed'
        ]

    ]
)

