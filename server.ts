import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './pages/router';  // Import the new router

const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// MongoDB Connection
const mongoDB = 'mongodb://127.0.0.1:27017/my_library_db';
mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => {
  console.log('Connected to database');
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Use the new router for all routes
app.use('/', router);
