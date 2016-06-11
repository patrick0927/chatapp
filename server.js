var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

//Middleware
var middleware = {
    requireAuthentication: function(req, res, next){
        console.log('Private route hit!');
        next();
    },
    logger: function(req, res, next){
        console.log( new Date().toString() +': Request: ' + req.method + ' ' + req.originalUrl );
        next();
    }
};

app.use(middleware.logger);
// app.use(middleware.requireAuthentication);

app.get('/about', middleware.requireAuthentication, function (req, res){
    res.send('About us');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log('Express server started on port ' + PORT + '!');
});