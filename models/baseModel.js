var config      = require('../conf/config.js'),
    Q           = require('q'),
    db          = config.database,
    mongoClient = require('mongodb').MongoClient,
    ObjectId    = require('mongodb').ObjectId;

var dbUri = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`;
exports.getRaces = () => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if (err) console.log(err);
        var collection = client.db(db.name).collection('races');
        
        collection.find({'type': "core"}).toArray().then( (result) => {
            if(result == null) {
                console.log('err')
                deferred.resolve(false);
            } else {
                console.log('true');
                result.forEach( raceName => {
                    raceName.url = encodeURIComponent(raceName.name);
                });
                deferred.resolve(result);
            }
            client.close();
        });

        // collection.find({'publishType': 'core'}, (result) => {
        //     if(result == null) {
        //         deferred.resolve(false);
        //     } else {
        //         deferred.resolve(result);
        //     }
        //     client.close()
        // })
    });
    return deferred.promise;
}

exports.getRace = (raceName) => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if(err) console.log(err);
        var collection = client.db(db.name).collection('races');

        collection.findOne({name: {$regex: new RegExp('^' + raceName.toLowerCase() + '$','i')}}).then( (result) => {
            if(result == null) {
                console.log('error');
                deferred.resolve(false);
            } else {
                console.log('Retrieved details for the "' + raceName + '" race.');
                deferred.resolve(result);
            }
            client.close();
        });
    });
    return deferred.promise;
}

exports.getRandomRace = () => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if(err) console.log(err);
        var collection = client.db(db.name).collection('races');

        collection.aggregate([{$sample: {size: 1}}]).toArray().then(result => {
            // console.log(result);
            deferred.resolve(result);
            client.close();
        })
    })
    return deferred.promise;
}

exports.getRandomClass = () => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if(err) console.log(err);
        var collection = client.db(db.name).collection('classes');

        collection.aggregate([{$sample: {size: 1}}]).toArray().then(result => {
            // console.log(result);
            deferred.resolve(result);
            client.close();
        })
    })
    return deferred.promise;
}

exports.getClasses = () => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if (err) console.log(err);
        var collection = client.db(db.name).collection('classes');

        collection.find({}).toArray().then( (result) => {
            if(result == null) {
                console.log('error');
                deferred.resolve(false);
            } else {
                console.log("Successfully retrieved classes");
                result.forEach( className => {
                    className.url = encodeURIComponent(className.name);
                });
                // console.log(result);
                deferred.resolve(result);
            }
            client.close();
        });
    });
    return deferred.promise;
}

exports.getClass = (className) => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if(err) console.log(err);
        var collection = client.db(db.name).collection('classes');
        console.log('This is for className',className)
        collection.findOne({name: {$regex: new RegExp('^' + className.toLowerCase() + '$','i')}}).then( (result) => {
            if(result == null) {
                console.log('error');
                deferred.resolve(false);
            } else {
                console.log('Retrieved details for the "' + className + '" class.');
                deferred.resolve(result);
            }
            client.close();
        });
    });
    return deferred.promise;
}

exports.getAssociates = () => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if (err) console.log(err);

        var collection = client.db(db.name).collection('chargen');

        collection.findOne({name: 'infAssocTable'}).then( result => {
            deferred.resolve(result);
            client.close();
        });
    });
    return deferred.promise;
}

exports.getChargenTable = (tableName) => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if (err) console.log(err);

        var collection = client.db(db.name).collection('chargen');

        collection.findOne({name: tableName}).then( result => {
            deferred.resolve(result);
            client.close();
        });
    });
    return deferred.promise;
}
