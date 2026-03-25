let students = [
  { id: 1, name: 'Arjun', course: 'AI' },
  { id: 2, name: 'Priya', course: 'Web' }
];

function getStudents() {
  return students;
}

function addStudent(student) {
  students.push(student);
}

module.exports = {
  getStudents,
  addStudent
};
