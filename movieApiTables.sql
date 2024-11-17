-- Active: 1730270973203@@127.0.0.1@5432@postgres@public


CREATE TABLE genre(
    genre_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name VARCHAR(20)
);
CREATE TABLE movie(
    movie_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_name VARCHAR(30),
    movie_year INT,
    genre_id int,
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE create_user(
    user_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(30),
    username VARCHAR(10),
    users_password VARCHAR(30),
    year_of_birth int
);


CREATE TABLE review(
    review_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_id int,
    Foreign Key (movie_id) REFERENCES movie(movie_id),
    user_id int,
    Foreign Key (user_id) REFERENCES create_user(user_id),
    stars int CHECK (stars > 0 and stars < 6),
    review_text TEXT
);

CREATE Table favorite(
    favorite_id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_id int,
    Foreign Key (movie_id) REFERENCES movie (movie_id),
    user_id int,
    Foreign Key (user_id) REFERENCES create_user(user_id)
)
