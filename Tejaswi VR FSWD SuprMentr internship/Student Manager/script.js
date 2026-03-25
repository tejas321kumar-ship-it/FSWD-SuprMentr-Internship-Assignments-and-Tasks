
const students = [
    {
        name: "Tejaswi",
        marks: { math: 95, science: 88, english: 92, history: 78, computer: 96 }
    },
    {
        name: "Rahul",
        marks: { math: 72, science: 65, english: 80, history: 70, computer: 85 }
    },
    {
        name: "Priya",
        marks: { math: 88, science: 91, english: 76, history: 85, computer: 90 }
    },
    {
        name: "Ankit",
        marks: { math: 55, science: 60, english: 58, history: 62, computer: 70 }
    },
    {
        name: "Sneha",
        marks: { math: 98, science: 95, english: 97, history: 93, computer: 99 }
    }
];

function calculateAverage(marks) {
    let values = Object.values(marks);
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        total += values[i];
    }
    return total / values.length;
}

function getGrade(average) {
    if (average >= 90) return "A+";
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";
    return "F";
}

function gradeClass(grade) {
    if (grade === "A+") return "grade grade-a-plus";
    if (grade === "A") return "grade grade-a";
    if (grade === "B") return "grade grade-b";
    if (grade === "C") return "grade grade-c";
    if (grade === "D") return "grade grade-d";
    return "grade grade-f";
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayStudentCards() {
    let container = document.getElementById("cards");
    let html = "";

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        let subjects = Object.keys(student.marks);
        let avg = calculateAverage(student.marks);
        let grade = getGrade(avg);
        let total = 0;

        let rows = "";
        for (let j = 0; j < subjects.length; j++) {
            total += student.marks[subjects[j]];
            rows += "<tr><td>" + capitalize(subjects[j]) + "</td><td>" + student.marks[subjects[j]] + "</td></tr>";
        }

        html += '<div class="card">';
        html += "<h3>" + student.name + "</h3>";
        html += "<table>" + rows + "</table>";
        html += '<div class="divider"></div>';
        html += '<div class="summary">';
        html += "Total: <span>" + total + " / " + (subjects.length * 100) + "</span><br>";
        html += "Average: <span>" + avg.toFixed(2) + "</span><br>";
        html += 'Grade: <span class="' + gradeClass(grade) + '">' + grade + "</span>";
        html += "</div>";
        html += "</div>";
    }

    container.innerHTML = html;
}

function findTopper() {
    let topper = students[0];
    let highestAvg = calculateAverage(students[0].marks);

    for (let i = 1; i < students.length; i++) {
        let avg = calculateAverage(students[i].marks);
        if (avg > highestAvg) {
            highestAvg = avg;
            topper = students[i];
        }
    }
    return { name: topper.name, average: highestAvg };
}

function getSubjectToppers() {
    let subjects = Object.keys(students[0].marks);
    let toppers = {};

    for (let i = 0; i < subjects.length; i++) {
        let sub = subjects[i];
        let bestName = students[0].name;
        let bestMark = students[0].marks[sub];

        for (let j = 1; j < students.length; j++) {
            if (students[j].marks[sub] > bestMark) {
                bestMark = students[j].marks[sub];
                bestName = students[j].name;
            }
        }
        toppers[sub] = { name: bestName, mark: bestMark };
    }
    return toppers;
}

function classAverage() {
    let total = 0;
    for (let i = 0; i < students.length; i++) {
        total += calculateAverage(students[i].marks);
    }
    return total / students.length;
}

function displayOverview() {
    let container = document.getElementById("overview");
    let avg = classAverage();
    let grade = getGrade(avg);
    let top = findTopper();

    let html = "<table>";
    html += "<tr><th>Class Average</th><td>" + avg.toFixed(2) + "</td></tr>";
    html += '<tr><th>Class Grade</th><td><span class="' + gradeClass(grade) + '">' + grade + "</span></td></tr>";
    html += "<tr><th>Overall Topper</th><td>" + top.name + " (Avg: " + top.average.toFixed(2) + ")</td></tr>";
    html += "<tr><th>Total Students</th><td>" + students.length + "</td></tr>";
    html += "</table>";

    container.innerHTML = html;
}

function displaySubjectToppers() {
    let container = document.getElementById("toppers");
    let toppers = getSubjectToppers();
    let subjects = Object.keys(toppers);

    let html = "<table>";
    html += "<tr><th>Subject</th><th>Topper</th><th>Marks</th></tr>";
    for (let i = 0; i < subjects.length; i++) {
        let sub = subjects[i];
        html += "<tr>";
        html += "<td>" + capitalize(sub) + "</td>";
        html += "<td>" + toppers[sub].name + "</td>";
        html += "<td>" + toppers[sub].mark + "</td>";
        html += "</tr>";
    }
    html += "</table>";

    container.innerHTML = html;
}

function addStudent(name, marks) {
    students.push({ name: name, marks: marks });
    logMessage("Added new student: " + name);
}

function removeStudent(name) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].name.toLowerCase() === name.toLowerCase()) {
            students.splice(i, 1);
            logMessage("Removed student: " + name);
            return;
        }
    }
    logMessage("Student not found: " + name);
}

function logMessage(msg) {
    let log = document.getElementById("log");
    log.innerHTML += "<p>&#9654; " + msg + "</p>";
}


addStudent("Kavya", { math: 82, science: 79, english: 88, history: 90, computer: 84 });
logMessage("Kavya's Average: " + calculateAverage(students[students.length - 1].marks).toFixed(2));

removeStudent("Ankit");

displayStudentCards();
displayOverview();
displaySubjectToppers();

logMessage("Total students now: " + students.length);
