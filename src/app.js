const express = require("express");
const path = require ("path");
const app = express();
const session = require('express-session')
const puerto = 3000;
const indexRouter = require ('./Routes/index.routes');

const methodOverride = require('method-override');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser')


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({secret:'shh mensaje secreto',saveUninitialized:false,resave:false}));
app.use(methodOverride('_method'));
app.use(cookie());
app.use( "/", indexRouter);



app.listen(puerto,()=>{
    console.log(`servidor corriendo en el puerto ${puerto} `);
});



