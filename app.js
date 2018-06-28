if(process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'production')
{
    console.log('Please specify one of the following environments to run your server');
    console.log('- development');
    console.log('- production');
    return;
}

config = require('config');


const express = require("express");
const morgan = require("morgan");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userModel = require("./models/user");
const boom = require("boom")
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const session = require('express-session');
const cookieParser = require("cookie-parser")
const flash = require("express-flash");

const constant = require("./constants")

//port
let port = process.env.PORT || config.get("port");

//database connection
const url = config.get("mongoDatabaseSetting.host") + "/" + config.get("mongoDatabaseSetting.database");

mongoose.connect(url, function(error){
    if(error) console.log(error)
    else console.log(`Database connected to ${url}`)
})

//morgan middleware
app.use(morgan("dev"));

//body parser middlerware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//session and flash middleware
app.use(cookieParser());
app.use(session({
    resave: constant.sessionMiddleware.RESAVE,
    saveUninitialized: constant.sessionMiddleware.SAVEUNINITIALIZED,
    secret: constant.sessionMiddleware.SECRET
}))
app.use(flash())

//ejs middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs")

//static files
app.use(express.static(__dirname + "/public"))

//requiring main route
var mainRoute = require("./routes/main");
var userRoute = require("./routes/user");

app.use(mainRoute)
app.use(userRoute)


//server
app.listen(port, (err) => {
    if(err) return err;
    console.log(`Server is listning at port ${port}`);
})