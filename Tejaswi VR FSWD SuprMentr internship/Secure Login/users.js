let users = [];

function getAllUsers() {
  return users;
}

function getUserByEmail(email) {
  for (let i = 0; i < users.length; i = i + 1) {
    if (users[i].email === email) {
      return users[i];
    }
  }

  return null;
}

function getUserById(id) {
  for (let i = 0; i < users.length; i = i + 1) {
    if (users[i].id === id) {
      return users[i];
    }
  }

  return null;
}

function addUser(user) {
  users.push(user);
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  addUser
};
