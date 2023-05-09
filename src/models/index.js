const Course = require("./Course");
const Student = require("./Student");


Course.belongsToMany(Student, {through: "studentCourses"})
Student.belongsToMany(Course, {through: "studentCourses"})