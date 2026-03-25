const express = require("express");
const logger = require("./logger");
const studentStore = require("./students");

const app = express();
const PORT = 3012;

app.use(express.json());
app.use(logger);

app.get("/", function (req, res) {
  res.send("Task 12 Student API is running");
});

app.get("/students", function (req, res) {
  res.json(studentStore.getStudents());
});

app.get("/students/:id", function (req, res) {
  const id = Number(req.params.id);
  const students = studentStore.getStudents();

  for (let i = 0; i < students.length; i = i + 1) {
    if (students[i].id === id) {
      res.json(students[i]);
      return;
    }
  }

  res.status(404).json({ message: "Student not found" });
});

app.post("/students/add", function (req, res) {
  const body = req.body;
  const students = studentStore.getStudents();

  if (!body.name || !body.course) {
    res.status(400).json({ message: "name and course are required" });
    return;
  }

  const newStudent = {
    id: students.length + 1,
    name: body.name,
    course: body.course
  };

  studentStore.addStudent(newStudent);
  res.status(201).json(newStudent);
});

app.listen(PORT, function () {
  console.log("Task 12 server running on http://localhost:" + PORT);
});
