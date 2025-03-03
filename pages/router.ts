import express from 'express';
import * as Home from './home';
import * as Books from './books';
import * as BooksStatus from './books_status';
import * as Authors from './authors';
import * as BookDetails from './book_details';
import * as CreateBook from './create_book';
import Genre from '../models/genre';

const router = express.Router();

// Home Route
router.get('/home', (_, res) => {
  Home.show_home(res);
});

// Books Routes
router.get('/books', async (_, res) => {
  try {
    const data = await Books.showBooks();
    res.send(data);
  } catch {
    res.send('No books found');
  }
});

// Book Details Route
router.get('/book_dtls', (req, res) => {
  BookDetails.showBookDtls(res, req.query.id as string);
});

// Authors Route
router.get('/authors', (_, res) => {
  Authors.showAllAuthors(res);
});

// Book Status Route
router.get('/available', (_, res) => {
  BooksStatus.showAllBooksStatus(res);
});

// Create Book Route
router.post('/newbook', (req, res) => {
  const { familyName, firstName, genreName, bookTitle } = req.body;
  if (familyName && firstName && genreName && bookTitle) {
    CreateBook.new_book(res, familyName, firstName, genreName, bookTitle).catch(err => {
      res.send('Failed to create new book ' + err);
    });
  } else {
    res.send('Invalid Inputs');
  }
});

// **NEW: Genres Route**
router.get('/genres', async (_, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve genres' });
  }
});

// **NEW: Genre Details Route**
router.get('/genres/details', async (req, res) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ error: 'Genre ID is required' });
      return;
    }

    const genre = await Genre.findById(id);
    if (!genre) {
      res.status(404).json({ error: 'Genre not found' });
      return;
    }

    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve genre details' });
  }
});

export default router;
