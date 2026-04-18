let books = [
  { id: 1, title: 'Atomic Habits', authorId: 1, genre: 'Self Help', price: 499 },
  { id: 2, title: 'The Pragmatic Programmer', authorId: 2, genre: 'Technology', price: 799 },
  { id: 3, title: 'The Alchemist', authorId: 3, genre: 'Fiction', price: 350 }
];

function getAllBooks() {
  return books;
}

function getBookById(id) {
  for (let i = 0; i < books.length; i = i + 1) {
    if (books[i].id === id) {
      return books[i];
    }
  }
  return null;
}

function getBooksByAuthorId(authorId) {
  const result = [];

  for (let i = 0; i < books.length; i = i + 1) {
    if (books[i].authorId === authorId) {
      result.push(books[i]);
    }
  }

  return result;
}

function addBook(book) {
  books.push(book);
}

function updateBook(id, updatedBook) {
  for (let i = 0; i < books.length; i = i + 1) {
    if (books[i].id === id) {
      books[i] = updatedBook;
      return true;
    }
  }
  return false;
}

function removeBook(id) {
  const nextBooks = [];
  let found = false;

  for (let i = 0; i < books.length; i = i + 1) {
    if (books[i].id === id) {
      found = true;
    } else {
      nextBooks.push(books[i]);
    }
  }

  if (found) {
    books = nextBooks;
  }

  return found;
}

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByAuthorId,
  addBook,
  updateBook,
  removeBook
};
