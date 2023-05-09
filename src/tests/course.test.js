const request = require("supertest")
const Course = require("../models/Course")
const app = require("../app");
const Student = require("../models/Student");
require("../models")

let courseId;
let data = {
    name: "React js",
    credits: 3
}
let dataStudent = {
    firstName: "Marlon",
    lastName: "Cardenas",
    birthday: "1980-12-10",
    program: "Ingenieria Civil"
}
test("GET /courses should return status 200", async() => {
    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].students).toBeDefined()
})

test("POST /courses should return status 201", async() => {
    const res = await request(app).post("/courses").send(data);
    courseId = res.body.id
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(data.name)
})

test("POST /:id/students should return status 201", async() =>{
    const student = await Student.create(dataStudent);
    const res = await request(app).post(`/courses/${courseId}/students`).send([student.id]);
    await student.destroy()
    expect(res.statusCode).toBe(201);
    expect(res.body.length).toBe(1)
})

test("GET /courses/:id to getOne should return status 200", async() => {
    const res = await request(app).get(`/courses/${courseId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(data.name)
    expect(res.body.students).toBeDefined()
})

test("PUT /courses/:id should return status 201", async() => {
    const res = await request(app).put(`/courses/${courseId}`).send({"name": "Fundamentos"});
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Fundamentos")
})


test("DELETE /courses/:id should return status 204", async() => {
    const res = await request(app).delete(`/courses/${courseId}`);
    expect(res.statusCode).toBe(204);
})