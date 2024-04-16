const express = require("express");
const path = require("path");
const app = express();
const puerto = 3000;
const indexRouter = require ('./Routes/index.routes');

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.use(express.static("public"));

app.listen(puerto,()=>{
    console.log(`servidor corriendo en el puerto ${puerto} `);
});
app.use( "/", indexRouter);


