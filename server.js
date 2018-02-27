const express = require('express');

const bodyParser = require("body-parser");
const path = require('path');
var routes = require("./routes.js");
var app = express();





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

routes(app);


var server = app.listen(process.env.PORT || 3000,function(){
    console.log("App Running on Environment "+app.get('env'))
    console.log("App Running on port number "+server.address().port)
});



