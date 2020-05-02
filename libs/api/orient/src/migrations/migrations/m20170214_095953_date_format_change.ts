import {migration} from '../manager';

module.exports = migration(
    "date fromat change",
    [
        [
            `ALTER DATABASE DATETIMEFORMAT "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"`,
            `ALTER DATABASE DATETIMEFORMAT "yyyy-MM-dd HH:mm:ss"`
        ],
        [
            `ALTER DATABASE TIMEZONE UTC`,
            `ALTER DATABASE TIMEZONE "Europe/Berlin"`
        ]
    ]
)

