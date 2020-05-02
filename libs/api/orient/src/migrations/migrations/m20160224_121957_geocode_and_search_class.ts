import {migration} from '../manager';

module.exports = migration(
    "geocode and search class",
    [
        // geocode query class
        [
            'CREATE CLASS GeocodeQuery',
            'DROP CLASS GeocodeQuery'
        ],
        [
            'CREATE PROPERTY GeocodeQuery.query STRING',
            'DROP PROPERTY GeocodeQuery.query'
        ],
        [
            'CREATE INDEX GeocodeQuery.query UNIQUE_HASH_INDEX',
            'DROP INDEX GeocodeQuery.query'
        ],
        [
            '',
            'DELETE FROM GeocodeQuery'
        ],

        // search query class
        [
            'CREATE CLASS SearchQuery',
            'DROP CLASS SearchQuery'
        ],
        [
            'CREATE PROPERTY SearchQuery.query STRING',
            'DROP PROPERTY SearchQuery.query'
        ],
        [
            'CREATE INDEX SearchQuery.query NOTUNIQUE_HASH_INDEX',
            'DROP INDEX SearchQuery.query'
        ],
        [
            '',
            'DELETE FROM SearchQuery'
        ],
    ]
)

