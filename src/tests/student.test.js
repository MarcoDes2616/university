const request = require("supertest")
const Student = require("../models/Student")
const app = require("../app");
const Course = require("../models/Course");
require("../models")

let studentId;
let data = {
    firstName: "Marlon",
    lastName: "Cardenas",
    birthday: "1980-12-10",
    program: "Ingenieria Civil"
}

let dataCourse = {
    name: "React js",
    credits: 3
}

test("GET /students should return status 200", async() => {
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].courses).toBeDefined()
})

test("POST /students should return status 201", async() => {
    const res = await request(app).post("/students").send(data);
    studentId = res.body.id
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(data.name)
})

test("POST /:id/courses should return status 201", async() =>{
    const course = await Course.create(dataCourse);
    const res = await request(app).post(`/students/${studentId}/courses`).send([course.id]);
    await course.destroy()
    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBe(1)
})

test("GET /students/:id to getOne should return status 200", async() => {
    const res = await request(app).get(`/students/${studentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(data.name)
    expect(res.body.courses).toBeDefined()
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
