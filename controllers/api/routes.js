var express     =   require('express'),
    router      =   express.Router(),
    baseModel   =   require('../../models/baseModel');


router.get('/version', (req, res) => {
    //This is api version check
    res.type('json');
    res.status(200).json({version: '0.1'});
});

router.post('/generate', getClass, getRace, getCircumstanceOfBirth, getChildhoodEvent, getUnusualHomeland, getConflicts, getRomanticRelations, getDrawbacks, getInfluentAssoc, (req, res) => {
    let char = req.char;
    // console.log(char);
    res.type('json');
    res.status(200).json({char: char});

});

router.post('/admin/addAssoc', (req, res) => {
    console.log(req)
    res.status(200).json({msg: 'success'});
})

function getRandom(array){
    var sumWeight = 0;
    for(let i = 0; i<array.length; i++) {
        sumWeight = sumWeight + parseInt(array[i].weight);
    }
    // console.log(array);
    selector = Math.floor(Math.random() * Math.floor(sumWeight));
    // console.log('selecor', sumWeight)
    for(let i = 0; i<array.length; i++) {
        selector -= array[i].weight;
        if ( selector <= 0 ) {
            return array[i];
        }
    }
}

function getRandomNum(numA, numB) {
    min = Math.ceil(numA);
    max = Math.floor(numB);
    rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
}
//Middleware helpers
function getRace(req, res, next) {
    
    if(req.body.race == 'random') {
        //Generate random race
        baseModel.getRandomRace().then(result => {
            req.body.race = result[0].name;
            // console.log('testing', req.body.race)
            // req.char.race = getRaceData(req.body.race, req)
            getRaceData(req.body.race, req).then( result => {
                req.char.race = result;
                next();
            })
        })
    } else {
        // req.char.race = getRaceData(req.body.race, req)
        getRaceData(req.body.race, req).then(result => {
            // console.log('Resutl', result);
            req.char.race = result;
            next();
        })
    }

}

function getClass(req, res, next) {
    console.log('GetClass')
    if(req.body.class == 'random') {
        //Generate random class
        baseModel.getRandomClass().then( result => {
            req.body.class = result[0].name;
            getClassData(req.body.race, req).then( result => {
                req.char.class = result;
                next()
            })
        })
    } else {
        getClassData(req.body.class, req).then(result => {
            req.char.class = result;
            next();
        })
        
    }
}
function getClassData(className, req) {
    return new Promise( (resolve, reject) => {
        baseModel.getClass(req.body.class).then(result => {
            req.char = {
                class: {},
                race: {}
            };
            // console.log('here1')
            classData = {
                name: result.name,
                type: result.type,
                background: getRandom(result.backgrounds),
                ageCategory: result.ageCategory
            };
            resolve(classData)
            // console.log('here')
        })
    })
}

function getRaceData(raceName, req) { //need req for access, but cannot set it here.
    
    return new Promise((resolve, reject) => {
        baseModel.getRace(raceName).then(result => {
            console.log('GetRace')
            race = result;
            let char = {}
            char.race = {
                name: race.name,
                gender: getRandom(race.chargen.genders),
                
                type: race.type,
                description: race.description,
                homeland: getRandom(race.chargen.homelands),
                parents: getRandom(race.chargen.parents),
                siblings: getRandom(race.chargen.siblings)
            };
            // console.log('here2')
            char.race.height = getRandomNum(char.race.gender.heightMin, char.race.gender.heightMax);
            char.race.weight = getRandomNum(char.race.gender.weightMin, char.race.gender.weightMax);
            // console.log('here3')
            // console.log('char1',req.char);
            char.race.age = getRandomNum(race.chargen.ages[req.char.class.ageCategory].ageMin,race.chargen.ages[req.char.class.ageCategory].ageMax)
            // console.log('chargen data',race.chargen) //Not making it to here, problem in line above
            // console.log(char.race.age)
            // console.log('char',char)
            // return char.race;
            resolve(char.race);

        })    
        
    })
}

function getCircumstanceOfBirth(req, res, next) {
    baseModel.getChargenTable('circumstanceBirth').then(result => {
        let birth = getRandom(result.options);
        if(birth.hasOwnProperty('table')){
            baseModel.getChargenTable(birth.table).then(result => {
                //add table options
                birth.table = getRandom(result.options);
                req.char.birth = birth;
                next();
            })
        } else {
            //Exit
            req.char.birth = birth;
            next();
        }
    })
}

function getChildhoodEvent(req, res, next) {
    baseModel.getChargenTable('majorEvents').then(result => {
        let majorEvent = getRandom(result.options);
        if (majorEvent.hasOwnProperty('table')) {
            //Result object refers to roll on another table
            baseModel.getChargenTable(majorEvent.table).then(result => {
                console.log('ReRoll Detected')
                if(majorEvent.table == 'crimePunishment'){
                    majorEvent.crime = getRandom(result.crimes);
                    majorEvent.punishment = getRandom(result.punishments);
                } else {
                    majorEvent.table = getRandom(result.options);
                }
                req.char.majorEvent = majorEvent;
                next();
            })
        } else {
            req.char.majorEvent = majorEvent;
            next();
        }
    })
}

function getRomanticRelations(req, res, next) {
    baseModel.getChargenTable('romanticRelations').then(result => {
        let relationships = getRandom(result.options);
        //modify roll?
        req.char.relationships = relationships;
        next();
    })
}

function getDrawbacks(req, res, next) {
    baseModel.getChargenTable('drawbacks').then(result => {
        let drawback = getRandom(result.options);
        req.char.drawback = drawback;
        next();
    })
}

function getInfluentAssoc(req, res, next) {
    baseModel.getChargenTable('infAssoc').then(result => {
        let infAssoc = getRandom(result.options);
        req.char.influentAssociate = infAssoc;
        next();
    })
}

function getUnusualHomeland(req, res, next) {
    if(req.char.race.homeland.hasOwnProperty('table')){
        baseModel.getChargenTable(req.char.race.homeland.table).then(result => {
            let homeland = getRandom(result.options);
            homeland.title += ' [Unusual Homeland]';
            req.char.race.homeland = homeland;
            next();
        });
    } else {
        next();
    }
}

//parent's profession

function getConflicts (req, res, next) {
    baseModel.getChargenTable('conflictsResolution').then(result => {
        let conflictRes = {};
        let cp = 0;
        conflictRes.conflict = getRandom(result.conflicts);
        cp += conflictRes.conflict.cp;
        conflictRes.subject = getRandom(result.subjects);
        if (conflictRes.subject.hasOwnProperty('cp')){
            cp += conflictRes.subject.cp;
        }
        
        conflictRes.motivation = getRandom(result.motivations);
        cp += conflictRes.motivation.cp;
        conflictRes.resolution = getRandom(result.resolutions);
        cp += conflictRes.resolution.cp;
        conflictRes.totalCP = cp;
        req.char.conflict = conflictRes;
        console.log(conflictRes);
        next();
    })
}


module.exports = router;