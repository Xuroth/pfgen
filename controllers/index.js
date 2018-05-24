var express = require('express'),
    router  = express.Router();

//public routes
router.use(require('./public/routes'));

//Export to ../app
module.exports = router;