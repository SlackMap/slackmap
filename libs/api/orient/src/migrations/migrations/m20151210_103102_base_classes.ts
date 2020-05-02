"use strict";
exports.name = "base classes";

exports.up = function (db) {

    function query(query) {
        console.log('EXEC:', query);
        return db.query(query).then(data=>{
                console.log('SUCCESS', query, data);
            },
            err=>{
                console.log('ERROR', query, err);
            });
    }
    /**
     * slug on v
     */
    query('CREATE PROPERTY V.slug STRING');
    query('CREATE INDEX V.slug UNIQUE_HASH_INDEX');
    query('CREATE PROPERTY V.slug_at DATETIME');
    // global id
    query('CREATE PROPERTY V.rid STRING');
    query('CREATE INDEX V.rid UNIQUE_HASH_INDEX');
    query('ALTER PROPERTY V.rid DEFAULT uuid()');
    query('ALTER PROPERTY V.rid READONLY true');
    query('ALTER PROPERTY V.rid MANDATORY true');

    /**
     * content calss
     */
    query('CREATE CLASS Content EXTENDS V')

    /**
     * item class
     */
    query('CREATE CLASS Item EXTENDS V')
    // coordinates
    query('CREATE PROPERTY Item.lat DECIMAL')
    query('CREATE PROPERTY Item.lon DECIMAL')
    query('CREATE INDEX Item.l_lon ON Item(lat,lon) SPATIAL ENGINE LUCENE')

    // type and subtype
    query('CREATE PROPERTY Item.type INTEGER')
    query('CREATE PROPERTY Item.subtype INTEGER')

    // name
    query('CREATE PROPERTY Item.name STRING')
    query('CREATE INDEX Item.name ON Item(name) FULLTEXT ENGINE LUCENE')
    query('CREATE PROPERTY Item.privacy INTEGER')
    query('ALTER PROPERTY Item.privacy DEFAULT 0');

    // created at
    query('CREATE PROPERTY Item.created_at DATETIME');

    /**
     * Spot & Location calsses
     */
    query('CREATE CLASS Spot EXTENDS Item')
    query('CREATE CLASS Location EXTENDS Item')

    /**
     * user calss
     */
    query('CREATE CLASS User EXTENDS Item')
    query('CREATE PROPERTY User.email STRING');
    query('ALTER PROPERTY User.email MANDATORY TRUE');
    query('CREATE INDEX User.email UNIQUE');
    query('CREATE PROPERTY User.facebook_id STRING');
    query('CREATE INDEX User.facebook_id UNIQUE_HASH_INDEX');

    query('CREATE PROPERTY User.login_at DATETIME');

    // tries on new 2.2 spatial things, no luck
    //query('CREATE PROPERTY Item.coordinates EMBEDDED OPoint')
    //query('CREATE INDEX Item_coordinates ON Item (coordinates) SPATIAL ENGINE LUCENE')
};

exports.down = function (db) {

    function query(query) {
        console.log('EXEC:', query);
        return db.query(query).then(data=>{
            console.log('SUCCESS', query, data);
        },
        err=>{
            console.log('ERROR', query, err);
        });
    }

    // User class
    query('DROP INDEX User.email');
    query('DROP INDEX User.facebook_id');
    query('DELETE VERTEX User')
    query('DROP PROPERTY User.login_at');
    query('DROP CLASS User')

    // Location class
    query('DELETE VERTEX Location')
    query('DROP CLASS Location')

    // Spot class
    query('DELETE VERTEX Spot')
    query('DROP CLASS Spot')

    // Item class
    query('DROP INDEX Item.name')
    query('DROP INDEX Item.l_lon')
    query('DROP PROPERTY Item.created_at');
    query('DELETE VERTEX Item')
    query('DROP CLASS Item')

    // Content class
    query('DELETE VERTEX Content')
    query('DROP CLASS Content')

    // V class
    query('DROP INDEX V.rid');
    query('DROP INDEX V.slug');
    query('DROP PROPERTY V.slug');
    query('DROP PROPERTY V.slug_at');
    query('DROP PROPERTY V.rid');
};

