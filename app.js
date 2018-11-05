var express     =   require('express'),
    app         =   express(),
    path        =   require('path'),
    hbs         =   require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs'}),
    extend      =   require('handlebars-extend-block'),
    bodyParser  =   require('body-parser'),
    //Server Instance
    config      =   require('./conf/config.js'),
    session     =   require('express-session'),
    port        =   config.serverPort;


//Extend Handlebars functionality
hbs.handlebars = extend(hbs.handlebars);

//Initialize Base Values
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.static('public'));
hbs.getPartials().then(data => {
    const partials = data;
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: config.sessionKey,
    saveUninitialized: true,
    resave: true
}));

//Default Layout
app.all('/*', (req, res, next) => {
    req.app.locals.layout = 'main';
    next();
})
//Message Middleware
app.use( (req, res, next) => {
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;
    
    delete req.session.error;
    delete req.session.notice;
    delete req.session.success;
    
    if (err) res.locals.errors = err;
    if (msg) res.locals.notices = msg;
    if (success) res.locals.successes = success;

    next();
})
//Controllers for routes
app.use(require('./controllers'));

//Set Error Views
app.use( (req, res, next) => {
    res.status(404).render('errors/404');
});

//Run Server
app.listen(port, () => {
    console.log('Server is running on port: ' + port + '.\n Ctrl+C to terminate.');
})