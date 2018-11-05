var express = require('express'),
cors        =   require('cors'),
    router  = express.Router();

//public routes
router.use(require('./public/routes'));
router.use('/characters', require('./public/characters'));

//admin routes
router.use('/admin', require('./admin/routes'));
router.use('/api', cors(), require('./api/routes'));

//Export to ../app
module.exports = router;