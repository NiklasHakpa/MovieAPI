import express from 'express'
import multer from 'multer'

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(multer({dest: "uploads/"}).none());
app.use(express.json());

app.listen(3001, () => {
    console.log("Server is running in port 3001");
    
})