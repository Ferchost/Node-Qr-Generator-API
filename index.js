const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");


app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {

    const body_to_string = JSON.stringify(req.body)
    const data = body_to_string

    if (data.length === 0) res.send("Empty data");
    
    
    qr.toDataURL(data, (err, src) => {
        if (err) res.send("Error");
        res.send({"image":src})
    });
});

const port = 5000;
app.listen(port, () => console.log("Running at port 5000"));