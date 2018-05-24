var express     =   require('express'),
    app         =   express(),
    path        =   require('path'),
    hbs         =   require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs'}),
    extend      =   require('handlebars-extend-block'),
    //Server Instance
    config      =   require('./conf/config.js'),
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