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
app.post('/genres', async (req,res) => {
        const { genre_name } = req.body;

        if (!genre_name) {
            return res.status(400).json({ error: "Genre name is required" });
        }
    
        try {
            const result = await pgPool.query(
                "INSERT INTO genre (genre_name) VALUES ($1) RETURNING *",
                [genre_name]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Failed to add genre" });
        }
    });

//GET all genres
app.get('/genres', async (req,res) => {
        try {
                const result = await pgPool.query("SELECT * FROM genre");
                res.json(result.rows);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch genres" });
            };
});


        //!!MOVIE ENDPOINTS!!//
//Add a new movie POST
app.post('/movie', async(req,res) => {
        const { movie_name, movie_year, genre_id } = req.body;

        if (!movie_name || !movie_year || !genre_id) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        try {
            const result = await pgPool.query(
                "INSERT INTO movie (movie_name, movie_year, genre_id) VALUES ($1, $2, $3) RETURNING *",
                [movie_name, movie_year, genre_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Failed to add movie" });
        }
});

//retrieve all movies
app.get('/movie', async(req,res) => {
        try {
                const result = await pgPool.query("SELECT * FROM movie");
                res.json(result.rows);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch movies" });
            }
});

//Retrieve specific movie by id
app.get('/movie/:movie_id', async(req,res) => {
        try {
                const result = await pgPool.query(
                    "SELECT * FROM movie WHERE id = $1",
                    [req.params.movie_id]
                );
        
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: "Movie not found" });
                }
        
                res.json(result.rows[0]);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch movie" });
            }
});


        //!!USER ENDPOINTS!!//
//Add a new user//
app.post('/users', async(req,res) => {
        const { first_name, username, users_password, year_of_birth } = req.body;

        if (!first_name || !username || !users_password || !year_of_birth) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        try {
            const result = await pgPool.query(
                "INSERT INTO create_user (first_name, username, users_password, year_of_birth) VALUES ($1, $2, $3, $4) RETURNING *",
                [first_name, username, users_password, year_of_birth]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Failed to add user" });
        };
});

//retrieve all users//
app.get('/users', async(req,res) => {
        try {
                const result = await pgPool.query("SELECT * FROM create_user");
                res.json(result.rows);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch users" });
            };
});

//retrieve specific user by id//
app.get('/users/:user_id', async (req, res) => {
        try {
                const result = await pgPool.query(
                    "SELECT * FROM create_user WHERE user_id = $1",
                    [req.params.user_id]
                );
        
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: "User not found" });
                }
        
                res.json(result.rows[0]);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch user" });
            };
});


        //!!REVIEW ENDPOINTS!!//
//Add a new review//
app.post('/reviews', async(req,res) => {
        const { movie_id, user_id, stars, review_text } = req.body;

        if (!movie_id || !user_id || !stars || !review_text) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        try {
            const result = await pgPool.query(
                "INSERT INTO review (movie_id, user_id, stars, review_text) VALUES ($1, $2, $3, $4) RETURNING *",
                [movie_id, user_id, stars, review_text]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Failed to add review" });
        };
});

//Retrieve all reviews//
app.get('/reviews', async(req,res) => {
        try {
                const result = await pgPool.query("SELECT * FROM review");
                res.json(result.rows);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch reviews" });
            };
});

//Retrieve reviews for a specific movie//
app.get('/reviews/:movie_id', async (req, res) => {
        try {
                const result = await pgPool.query(
                    "SELECT * FROM review WHERE movie_id = $1",
                    [req.params.movie_id]
                );
                res.json(result.rows);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch reviews" });
            };
});

//Retrieve reviews by a specific user//
app.get('/reviews/user/:user_id', async(req,res) => {
        const userId = req.params.user_id; // Extract the user ID from the route

        try {
            // Query to fetch all reviews by the given user ID
            const result = await pgPool.query(
                "SELECT * FROM review WHERE user_id = $1",
                [userId]
            );
    
            // If no reviews found, return an appropriate response
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "No reviews found for this user" });
            }
    
            // Return the reviews in the response
            res.json(result.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Failed to fetch reviews for the user" });
        };
});


        //!!FAVOURITES ENDPOINTS!!//
//Add a new movie to user's favourites//
app.post('/favourites', async(req,res) => {
        const { user_id, movie_id } = req.body;

    if (!user_id || !movie_id) {
        return res.status(400).json({ error: "User ID and Movie ID are required" });
    }

    try {
        const result = await pgPool.query(
            "INSERT INTO favorite (user_id, movie_id) VALUES ($1, $2) RETURNING *",
            [user_id, movie_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to add favorite" });
    };
});

//Retrieve all favorite movies//
app.get('/favourites', async(req,res) => {
        try {
                const result = await pgPool.query("SELECT * FROM favorite");
                res.json(result.rows);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch favorites" });
            };
});

//Retrieve favorites for a specific user.
app.get('/favourites/:user_id', async(req,res) => {
        try {
                const result = await pgPool.query(
                    "SELECT * FROM favorite WHERE user_id = $1",
                    [req.params.user_id]
                );
                res.json(result.rows);
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ error: "Failed to fetch favorites" });
            };
});