const express = require("express");

const app = express();

//port
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Index Page")
})

app.listen(port, (err) => {
    if(err) return err;
    console.log(`Server is listning at port ${port}`);
})