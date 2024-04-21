const express = require("express");
const path = require ("path");
const app = express();
const session = require('express-session')
const puerto = 3000;
const indexRouter = require ('./Routes/index.routes');

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));





app.listen(puerto,()=>{
    console.log(`servidor corriendo en el puerto ${puerto} `);
});
app.use( "/", indexRouter);
app.use(express.static("public"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({secret:'shh mensaje secreto',saveUninitialized:false,resave:false}));


