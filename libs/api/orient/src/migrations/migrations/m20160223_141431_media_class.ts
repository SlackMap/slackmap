"use strict";
exports.name = "media class";

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
    query('CREATE CLASS MediaService EXTENDS Item')
    query('CREATE CLASS Photo EXTENDS MediaService')
    query('CREATE PROPERTY E.created_at DATETIME')

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

    query('DELETE VERTEX Photo')
    query('DELETE VERTEX MediaService')
    query('DROP CLASS Photo')
    query('DROP CLASS MediaService')
    query('DROP PROPERTY E.created_at')
};

