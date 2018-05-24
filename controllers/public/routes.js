var express     =   require('express'),
    router      =   express.Router(),
    baseModel   =   require('../../models/baseModel');

router.get('/', (req, res) => {
    res.render('index');
});

//Export to ../index
module.exports = router;