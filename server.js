const express = require("express");
const fs = require("fs");
// shortid to generate a random short id used for storing and also deleting notes
const shortId = require("shortid")
const db = require("./Develop/db/db.json");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// routes


app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/notes.html')));


app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/assets/js/index.js')));


app.get('/assets/css/styles.css', (req, res)=> res.sendFile(path.join(__dirname, '/Develop/public/assets/css/styles.css')));

// for displaying notes

app.get("/api/notes",  (req, res) => res.json(db));


// saving the notes the user has typed to db using post method

app.post("/api/notes", (req, res) => {
    console.log(req.body);
    const newNote = {
        id: shortId.generate(),
        title: req.body.title,
        text: req.body.text,
    };
    console.log(newNote);
    db.push(newNote);
    fs.writeFile("./Develop/db/db.json", JSON.stringify(db), function(err){
    if (err) throw err;
    return res.json(db);
    });

});


// deleting the note using delete method

app.delete("/api/notes/:id", (req, res) =>{
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
    console.log(`server is listening: http://localhost:${PORT}`);
  });