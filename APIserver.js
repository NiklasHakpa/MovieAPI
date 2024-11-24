import express from 'express'
import multer from 'multer'

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(multer({dest: "uploads/"}).none());
app.use(express.json());

app.listen(3001, () => {
    console.log("Server is running in port 3001");
});
        //!!GENRES!!//

//Add new genre maybe post
app.post('/genres', (req,res) => {
    //{"genre_name": "Action"}//
    //maybe like this
});
//GET all genres
app.get('/genres', (req,res) => {
});


        //!!MOVIES!!//
//Add new movie POST
app.post('/movies', (req,res) => {
    //{ maybe like a this
        //"movie_name": "Inception",
        //"movie_year": 2010,
        //"genre_id": 1}
});
//retrieve all movies GET
app.get('/movies', (req,res) => {
});
//Retrieve specific movie by id GET
app.get('/movies/{movie_id}', (req,res) => {
});
