import {pgPool} from './pg_connection.js'
import express from 'express'
import multer from 'multer'


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(multer({dest: "uploads/"}).none());
app.use(express.json());

app.listen(3001, () => {
    console.log("Server is running in port 3001");
});

        //!!GENRES ENDPOINTS!!//
//Add new genre maybe post
app.post('/genres', (req,res) => {
    //{"genre_name": "Action"}//
    //maybe like this//
});

//GET all genres
app.get('/genres', (req,res) => {
});


        //!!MOVIE ENDPOINTS!!//
//Add a new movie POST
app.post('/movies', (req,res) => {
    //{ maybe like a this
        //"movie_name": "Inception",
        //"movie_year": 2010,
        //"genre_id": 1}
});

//retrieve all movies
app.get('/movies', (req,res) => {
});

//Retrieve specific movie by id
app.get('/movies/{movie_id}', (req,res) => {
});


        //!!USER ENDPOINTS!!//
//Add a new user//
app.post('/users', (req,res) => {
    //{ example
    //    "first_name": "John",
    //    "username": "john_doe",
    //    "users_password": "password123",
    //    "year_of_birth": 1990
    //  };
});

//retrieve all users//
app.get('/users', (req,res) => {
});

//retrieve specific user by id//
app.get('/users/{user_id}', (req,res) => {
});


        //!!REVIEW ENDPOINTS!!//
//Add a new review//
app.post('/reviews', (req,res) => {
    //{ example mayb?
    //    "movie_id": 1,
    //    "user_id": 2,
    //    "stars": 5,
    //    "review_text": "Amazing movie!"
    //  }
});

//Retrieve all reviews//
app.get('/reviews', (req,res) => {
});

//Retrieve reviews for a specific movie//
app.get('/reviews/{movie_id}', (req,res) => {
});

//Retrieve reviews by a specific user//
app.get('/reviews/user/{user_id}', (req,res) => {
});


        //!!FAVOURITES ENDPOINTS!!//
//Add a new movie to user's favourites//
app.post('/favourites', (req,res) => {
});

//Retrieve all favorite movies//
app.get('/favourites', (req,res) => {
});

//Retrieve favorites for a specific user.
app.get('/favourites/{user_id}', (req,res) => {
});