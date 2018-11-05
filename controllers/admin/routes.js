var express     =   require('express'),
    { validationResult }    = require('express-validator/check'),
    {matchedData, sanitize} = require('express-validator/filter'),
    router      =   express.Router(),
    baseModel   =   require('../../models/baseModel'),
    adminModel  =   require('../../models/adminModel'),
    validator   =   require('../../helpers/validation');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/race/:raceName', (req, res) => {
    raceName = decodeURIComponent(req.params.raceName);
    baseModel.getRace(raceName).then( result => {
        if(!result) {
            //No Race found
            req.session.error = `Unable to find the race "${raceName}".`;
            console.log('Error getting race:' + raceName);
            deferred.resolve(false);
        } else {
            raceData = result;
            res.render('admin/viewRace', {raceData});
        }
    })
})
router.get('/races', (req, res) => {
    let races = baseModel.getRaces().then( result => {
        races = result;
        res.render('admin/viewRaces', {races});
    });
});

router.get('/races/new', (req, res) => {
    res.render('admin/newRace');
});

router.post('/races/new', validator.adminNewRace, (req, res) => {
    let success = matchedData(req);
    let errors = validationResult(req);
    console.log('Errors', errors)
    if(!errors.isEmpty()) {
        req.session.error = errors.mapped();
        res.redirect('/admin/races/new');
    } else {
        //Validation successful! Add to database
        adminModel.addRace(success).then((result) => {
            console.log('check')
            res.redirect('/admin/races');
        });
    }
})
router.get('/class/:className', (req, res) => {
    className = decodeURIComponent(req.params.className);
    //get class data
    baseModel.getClass(className).then( result => {
        
        if(!result) {
            
            //No class found.
            req.session.error = `Unable to find the class "${className}".`;
            console.log('check')
            res.redirect('/admin/classes');
        } else {
            classData = result;
            res.render('admin/viewClass', {classData});
        }
        
    });
});

router.get('/classes', (req, res) => {
    let classes = baseModel.getClasses().then( result => {
        classes = result;
        res.render('admin/viewClasses', {classes});
    });
})

router.get('/classes/new', (req, res) => {
    
    res.render('admin/newClass');
});

router.post('/classes/new', validator.adminNewClass, (req, res) => {
    // console.log(req.body);
    //console.log(req.body.hasOwnProperty('backgrounds'));
    //var backgrounds = [];
    // if(req.body.hasOwnProperty('backgrounds')) {
    //     req.body.backgrounds.forEach( background => {
    //         console.log(background)
    //     })
    // }

    // Since validation should take place via middleware, all input in this method is expected to be clean.
    //adminModel.addClass
    // let success = validator.adminNewClass(req.body);
    // console.log(success);
    let success = matchedData(req);
    let errors = validationResult(req);
    console.log('Errors', errors)
    if(!errors.isEmpty()) {
        req.session.error = errors.mapped();
        res.redirect('/admin/classes/new');
    } else {
        //Validation successful! Add to database
        adminModel.addClass(success).then((result) => {
            console.log('check')
            res.redirect('/admin/classes');
        });
    }
});

router.get('/associates', (req, res) => {
    baseModel.getAssociates().then(result => {
        res.render('admin/associates', {associates: result});
    });
});



module.exports = router;