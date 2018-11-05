var config      = require('../conf/config.js'),
    Q           = require('q'),
    db          = config.database,
    mongoClient = require('mongodb').MongoClient,
    ObjectId    = require('mongodb').ObjectId;

    var dbUri = `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`;
exports.addRace = (raceData) => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if (err) console.log(err);
        
        var collection = client.db(db.name).collection('races');
        
        collection.insertOne(raceData).then( (result) => {
            if (result == null) {
                console.log('Error adding race');
                deferred.resolve(false);
            } else {
                console.log('Successfully added race ' + raceData.name);
                deferred.resolve(true);
            }
            client.close()
        });
    });
    return deferred.promise;
}

exports.addClass = (classData) => {
    var deferred = Q.defer();

    mongoClient.connect(dbUri, (err, client) => {
        if (err) console.log(err);
        
        var collection = client.db(db.name).collection('classes');
        
        collection.insertOne(classData).then( (result) => {
            if (result == null) {
                console.log('Error adding class');
                deferred.resolve(false);
            } else {
                console.log('Successfully added class ' + classData.name);
                deferred.resolve(true);
            }
            client.close()
        });
    });
    return deferred.promise;
}