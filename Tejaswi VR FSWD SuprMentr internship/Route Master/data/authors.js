let authors = [
  { id: 1, name: 'James Clear', country: 'USA' },
  { id: 2, name: 'Andrew Hunt', country: 'USA' },
  { id: 3, name: 'Paulo Coelho', country: 'Brazil' }
];

function getAllAuthors() {
  return authors;
}

function getAuthorById(id) {
  for (let i = 0; i < authors.length; i = i + 1) {
    if (authors[i].id === id) {
      return authors[i];
    }
  }
  return null;
}

function addAuthor(author) {
  authors.push(author);
}

function updateAuthor(id, updatedAuthor) {
  for (let i = 0; i < authors.length; i = i + 1) {
    if (authors[i].id === id) {
      authors[i] = updatedAuthor;
      return true;
    }
  }
  return false;
}

function removeAuthor(id) {
  const nextAuthors = [];
  let found = false;

  for (let i = 0; i < authors.length; i = i + 1) {
    if (authors[i].id === id) {
      found = true;
    } else {
      nextAuthors.push(authors[i]);
    }
  }

  if (found) {
    authors = nextAuthors;
  }

  return found;
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  removeAuthor
};
