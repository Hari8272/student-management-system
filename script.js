// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    localStorage.setItem("teacherUsername", username);
    localStorage.setItem("teacherPassword", password);

    alert("Registration successful!");
    window.location.href = "index.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = localStorage.getItem("teacherUsername");
    const storedPass = localStorage.getItem("teacherPassword");

    if (username === storedUser && password === storedPass) {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password!");
    }
  });
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
}

// STUDENT MANAGEMENT
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");

let students = JSON.parse(localStorage.getItem("students")) || [];

function renderStudents() {
  if (!studentTable) return;
  studentTable.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.phone}</td>
      <td>${student.email}</td>
      <td><button onclick="deleteStudent(${index})">Delete</button></td>
    `;
    studentTable.appendChild(row);
  });
}

if (studentForm) {
  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("studentName").value;
    const roll = document.getElementById("studentRoll").value;
    const phone = document.getElementById("studentPhone").value;
    const email = document.getElementById("studentEmail").value;

    students.push({ name, roll, phone, email });
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
    studentForm.reset();
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

renderStudents();
