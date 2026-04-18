const express = require('express');
const authorsStore = require('../data/authors');
const booksStore = require('../data/books');

const router = express.Router();

router.get('/', function (req, res) {
  res.json(authorsStore.getAllAuthors());
});

router.get('/:id/books', function (req, res) {
  const id = Number(req.params.id);
  const author = authorsStore.getAuthorById(id);

  if (!author) {
    res.status(404).json({ message: 'Author not found' });
    return;
  }

  const books = booksStore.getBooksByAuthorId(id);
  res.json({ author: author, books: books });
});

router.get('/:id', function (req, res) {
  const id = Number(req.params.id);
  const author = authorsStore.getAuthorById(id);

  if (!author) {
    res.status(404).json({ message: 'Author not found' });
    return;
  }

  res.json(author);
});

router.post('/', function (req, res) {
  const body = req.body;
  const authors = authorsStore.getAllAuthors();

  if (!body.name) {
    res.status(400).json({ message: 'name is required' });
    return;
  }

  const newAuthor = {
    id: authors.length + 1,
    name: body.name,
    country: body.country || 'Unknown'
  };

  authorsStore.addAuthor(newAuthor);
  res.status(201).json(newAuthor);
});

router.put('/:id', function (req, res) {
  const id = Number(req.params.id);
  const body = req.body;
  const currentAuthor = authorsStore.getAuthorById(id);

  if (!currentAuthor) {
    res.status(404).json({ message: 'Author not found' });
    return;
  }

  const updatedAuthor = {
    id: currentAuthor.id,
    name: body.name || currentAuthor.name,
    country: body.country || currentAuthor.country
  };

  authorsStore.updateAuthor(id, updatedAuthor);
  res.json(updatedAuthor);
});

router.delete('/:id', function (req, res) {
  const id = Number(req.params.id);
  const author = authorsStore.getAuthorById(id);

  if (!author) {
    res.status(404).json({ message: 'Author not found' });
    return;
  }

  const booksByAuthor = booksStore.getBooksByAuthorId(id);

  if (booksByAuthor.length > 0) {
    res.status(400).json({ message: 'Cannot delete author with existing books' });
    return;
  }

  authorsStore.removeAuthor(id);
  res.json({ message: 'Author deleted' });
});

module.exports = router;
