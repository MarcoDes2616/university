const Course = require("../../models/Course")
const Student = require("../../models/Student")

const createData = async() => {
    const data = [
        {
            "firstName": "Marco",
            "lastName": "Cardenas",
            "birthday": "1983-04-05",
            "program": "Ingenieria Mecánica"
        },
        {
            "firstName": "Luis",
            "lastName": "Sanchez",
            "birthday": "1983-10-29",
            "program": "Ingenieria Eléctrica"
        }
    ]

    await Student.bulkCreate(data)
}

const createDataCourse = async() => {
    const data = [
        {
            name: "Testing",
            credits: 5
        },
        {
            name: "Node js",
            credits: 4
        }
    ]

    await Course.bulkCreate(data)
}

module.exports = {
    createData,
    createDataCourse
};