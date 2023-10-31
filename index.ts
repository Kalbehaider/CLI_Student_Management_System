import inquirer from "inquirer";

// Class for Student
class Student {
  studentID: string;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string, courses: string[]) {
    this.studentID = generateStudentID();
    this.name = name;
    this.courses = courses;
    this.balance = 0;
  }

  enrollCourse(course: string) {
    this.courses.push(course);
  }

  viewBalance() {
    return this.balance;
  }

  payTuition(amount: number) {
    this.balance -= amount;
  }

  showStatus() {
    return `Name: ${this.name}\nID: ${
      this.studentID
    }\nCourses Enrolled: ${this.courses.join(", ")}\nBalance: $${this.balance}`;
  }
}

// Generate a random 5-digit Student ID
function generateStudentID(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Function to handle student operations
async function studentOperations() {
  const students: { [studentID: string]: Student } = {};

  while (true) {
    const { operation } = await inquirer.prompt([
      {
        type: "list",
        name: "operation",
        message: "Select an operation:",
        choices: [
          "Add Student",
          "Enroll in Course",
          "View Balance",
          "Pay Tuition",
          "Show Status",
          "Exit",
        ],
      },
    ]);

    if (operation === "Exit") {
      break;
    }

    if (operation === "Add Student") {
      const { name, courses } = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Enter student name:",
        },
        {
          type: "input",
          name: "courses",
          message: "Enter courses (comma-separated):",
        },
      ]);
      const student = new Student(
        name,
        courses.split(",").map((course) => course.trim())
      );
      students[student.studentID] = student;
      console.log(`Student added with ID: ${student.studentID}`);
    } else {
      const { studentID } = await inquirer.prompt([
        {
          type: "input",
          name: "studentID",
          message: "Enter student ID:",
        },
      ]);
      const student = students[studentID];

      if (!student) {
        console.log("Student not found");
        continue;
      }

      if (operation === "Enroll in Course") {
        const { course } = await inquirer.prompt([
          {
            type: "input",
            name: "course",
            message: "Enter course name:",
          },
        ]);
        student.enrollCourse(course);
        console.log(`Enrolled in ${course}`);
      } else if (operation === "View Balance") {
        console.log(`Balance: $${student.viewBalance()}`);
      } else if (operation === "Pay Tuition") {
        const { amount } = await inquirer.prompt([
          {
            type: "input",
            name: "amount",
            message: "Enter tuition amount to pay:",
          },
        ]);
        student.payTuition(parseFloat(amount));
        console.log(`Paid $${amount} in tuition`);
      } else if (operation === "Show Status") {
        console.log(student.showStatus());
      }
    }
  }
}

// Start the student operations
studentOperations();
