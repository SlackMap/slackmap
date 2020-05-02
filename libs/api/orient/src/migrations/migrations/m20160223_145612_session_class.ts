"use strict";
exports.name = "session class";

exports.up = function (db) {

    function query(query) {
        console.log('EXEC:', query);
        return db.query(query).then(data=> {
                console.log('SUCCESS', query, data);
            },
            err=> {
                console.log('ERROR', query, err);
            });
    }
    query('CREATE CLASS Session')
    query('CREATE PROPERTY Session.sid STRING');
    query('CREATE INDEX Session.sid UNIQUE_HASH_INDEX');

};

exports.down = function (db) {

    function query(query) {
        console.log('EXEC:', query);
        return db.query(query).then(data=> {
                console.log('SUCCESS', query, data);
            },
            err=> {
                console.log('ERROR', query, err);
            });
    }

    query('DROP INDEX Session.sid');
    query('DROP PROPERTY Session.sid');
    query('DROP CLASS Session')
};

