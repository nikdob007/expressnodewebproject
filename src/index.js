const path = require("path");
const hbs = require("hbs");
const requests = require("request");
const express = require("express");
const app = express();
const port = 8000;


const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");



// to set view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

// template engine route
app.get("/", (req, res) => {
    res.render("index", {
        channelName : "Nikunj",
    });
});

app.get("/about",(req, res) => {
    requests(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=6f437f80726f88c05c6fa25e37c0dbd4`)
    .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        console.log(`city name is ${arrData[0].name} and the temp is ${arrData[0].main.temp}`);

        res.write(arrData[0].name);
    })
    .on("end", (err) => {
        if(err) return console.log("connection closed due to errors", err);
        res.end();
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorcomment : "Ooops Page Couldn't found. Please click here!"
    });
});
app.listen(port, (req, res) => {
    console.log(`Server running port no ${port}`);
});