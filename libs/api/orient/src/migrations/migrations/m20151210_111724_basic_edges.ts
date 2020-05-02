"use strict";
exports.name = "basic edges";

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

    query('CREATE CLASS Created EXTENDS E');
    query('CREATE CLASS Updated EXTENDS E');
    query('CREATE CLASS MediaOf EXTENDS E');
    query('CREATE CLASS LocatedIn EXTENDS E');
    query('CREATE CLASS ContentOf EXTENDS E');
    query('CREATE CLASS Walked EXTENDS E');
    query('CREATE CLASS Rigged EXTENDS E');
    query('CREATE CLASS RigOf EXTENDS E');
    query('CREATE CLASS Likes EXTENDS E');
    query('CREATE CLASS Dislikes EXTENDS E');
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

    query('DELETE EDGE E')

    query('DROP CLASS Created ');
    query('DROP CLASS Updated ');
    query('DROP CLASS MediaOf ');
    query('DROP CLASS LocatedIn ');
    query('DROP CLASS ContentOf ');
    query('DROP CLASS Walked ');
    query('DROP CLASS Rigged ');
    query('DROP CLASS RigOf ');
    query('DROP CLASS Likes ');
    query('DROP CLASS Dislikes ');
};

