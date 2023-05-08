const request = require("supertest")
const Student = require("../models/Student")
const app = require("../app")

let studentId;
let data = {
    firstName: "Marlon",
    lastName: "Cardenas",
    birthday: "1980-12-10",
    program: "Ingenieria Civil"
}
test("GET /students should return status 200", async() => {
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
})

test("POST /students should return status 201", async() => {
    const res = await request(app).post("/students").send(data);
    studentId = res.body.id
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(data.name)
})

test("GET /students/:id to getOne should return status 200", async() => {
    const res = await request(app).get(`/students/${studentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(data.name)
})

test("PUT /students/:id should return status 201", async() => {
    const res = await request(app).put(`/students/${studentId}`).send({"program": "Programacion"});
    expect(res.statusCode).toBe(200);
    expect(res.body.program).toBe("Programacion")
})

test("DELETE /students/:id should return status 204", async() => {
    const res = await request(app).delete(`/students/${studentId}`);
    expect(res.statusCode).toBe(204);
})
