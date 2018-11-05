var express     =   require('express'),
    router      =   express.Router(),
    baseModel   =   require('../../models/baseModel'),
    config      =   require('../../conf/config');

router.get('/', (req, res) => {
    res.render('characters');
});

router.get('/generate', (req, res) => {
    var races = [];
    var classes = [];
    var json = {};
    baseModel.getRaces().then( result => {
        races = result;
        baseModel.getClasses().then(result => {
            classes = result;
            json.races = races;
            json.classes = classes;
            json = JSON.stringify(json)
            api = encodeURIComponent(config.apiURL);
            // console.log(json)
            res.render('characters/generator', {races, classes, json, api});
        })
        
    });
    
});

//Export to ../index
module.exports = router;