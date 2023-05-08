const Student = require("../../models/Student")

const createData = async() => {
    const data = [
        {
            "firstName": "Marco",
            "lastName": "Cardenas",
            "birthday": "1983/04/05",
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

module.exports = createData;