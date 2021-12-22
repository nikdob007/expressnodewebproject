const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.send("Welcome to our home page.");
});


app.get("/about", (req, res) => {
    res.send("Welcome to our about page.");
});

app.get("/contact", (req, res) => {
    res.send("Welcome to our contact page.");
});

app.get("/temp", (req, res) => {
    res.send({
        id : 1,
        name : "Nikunj"
    });
});

app.listen(port, () =>{
    console.log(`listing to port number ${port}`);
});