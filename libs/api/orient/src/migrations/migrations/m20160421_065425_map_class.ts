import {migration} from '../manager';

module.exports = migration(
    "Map class",
    [
        [
            'CREATE CLASS Map EXTENDS Item',
            'DROP CLASS Map'
        ]

    ]
)

