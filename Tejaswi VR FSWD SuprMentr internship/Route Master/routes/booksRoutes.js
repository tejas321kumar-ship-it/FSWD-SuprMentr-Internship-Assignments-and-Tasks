const express = require('express');
const booksStore = require('../data/books');
const authorsStore = require('../data/authors');

const router = express.Router();

router.get('/', function (req, res) {
  res.json(booksStore.getAllBooks());
});

router.get('/author/:authorId', function (req, res) {
  const authorId = Number(req.params.authorId);

  if (!authorsStore.getAuthorById(authorId)) {
    res.status(404).json({ message: 'Author not found' });
    return;
  }

  res.json(booksStore.getBooksByAuthorId(authorId));
});

router.get('/:id', function (req, res) {
  const id = Number(req.params.id);
  const book = booksStore.getBookById(id);

  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  res.json(book);
});

router.post('/', function (req, res) {
  const body = req.body;
  const books = booksStore.getAllBooks();

  if (!body.title || body.authorId === undefined) {
    res.status(400).json({ message: 'title and authorId are required' });
    return;
  }

  const authorId = Number(body.authorId);

  if (!authorsStore.getAuthorById(authorId)) {
    res.status(400).json({ message: 'authorId is invalid' });
    return;
  }

  const newBook = {
    id: books.length + 1,
    title: body.title,
    authorId: authorId,
    genre: body.genre || 'General',
    price: body.price !== undefined ? Number(body.price) : 0
  };

  booksStore.addBook(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', function (req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  const currentBook = booksStore.getBookById(id);

  if (!currentBook) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  const nextAuthorId = body.authorId !== undefined ? Number(body.authorId) : currentBook.authorId;

  if (!authorsStore.getAuthorById(nextAuthorId)) {
    res.status(400).json({ message: 'authorId is invalid' });
    return;
  }

  const updatedBook = {
    id: currentBook.id,
    title: body.title || currentBook.title,
    authorId: nextAuthorId,
    genre: body.genre || currentBook.genre,
    price: body.price !== undefined ? Number(body.price) : currentBook.price
  };

  booksStore.updateBook(id, updatedBook);
  res.json(updatedBook);
});

router.delete('/:id', function (req, res) {
  const id = Number(req.params.id);
  const deleted = booksStore.removeBook(id);

  if (!deleted) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  res.json({ message: 'Book deleted' });
});

module.exports = router;
