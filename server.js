const express = require("express");
const fs = require("fs");
const shortId = require("shortid")
const db = require("./Develop/db/db.json");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/notes.html')));


// for displaying notes

app.get("/api/notes", function (req, res){
    return res.json(db);
});


// saving the notes the user has typed to db

app.post("/api/notes", function(req, res){
    console.log(req.body);
    var newNote = {
        id: shortId.generate(),
        title: req.body.title,
        text: req.body.text,
    };
    console.log(newNote);
    db.push(newNote);
    // fs.writeFile("./Develop/db/db.json", JSON.stringify(db), function(err){
    // if (err) throw err;
    // return res.json(db);
    // });

});

app.delete("/api/notes/:id", function (req, res){
    // console.log(req.params.id);
    var id =req.params.id;
    db.splice(id -1, 1);
    db.forEach((obj, i) =>{
        obj.id = i + 1;
    });
    fs.writeFile("./Develop/db/db.json", JSON.stringify(db),function(){
        res.json(db);
    })
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });