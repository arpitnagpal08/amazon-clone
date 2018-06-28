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

//APIs
app.get("/", (req, res) => {
    res.send("Index Page")
})

//test router to check database connection
app.post("/testConnect", function(req, res, next){
    var user = new userModel();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(error){
        if(error) {
            return boom.conflict(next("Email already registered"))
        }
        else{
            res.json({
                "name": req.body.name,
                "email": req.body.email
            })
        }
    })
})


//server
app.listen(port, (err) => {
    if(err) return err;
    console.log(`Server is listning at port ${port}`);
})