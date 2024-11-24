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


        //!!USER ENDPOINTS!!//
//creates a new user//
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
//Creates a new review//
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