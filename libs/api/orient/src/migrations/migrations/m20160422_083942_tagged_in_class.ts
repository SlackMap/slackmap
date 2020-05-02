import {migration} from '../manager';

module.exports = migration(
    "TaggedIn class",
    [
        [
            'CREATE CLASS TaggedIn EXTENDS E',
            'DROP CLASS TaggedIn'
        ]

    ]
)

