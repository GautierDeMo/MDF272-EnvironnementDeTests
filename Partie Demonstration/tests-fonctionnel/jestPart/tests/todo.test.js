const request = require('supertest')
const app = require('../src/app')
const TodoApp = require('../src/models/todo')

describe("Todo API Test", () => {
    beforeEach(()=>{
        // Avant chaque test
        TodoApp.resetTasks()
    })
    beforeAll(() => {
        // Avant tout les tests
    })
    afterEach(()=> {
        // Après chaque test
    })
    afterAll(() => {
        // Après tout les tests
    })
    // beforeAll


    // beforeEach
    test("POST /api/tasks - Add a task", async () => {
        const task = "Pensé à acheter du lait"
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: task })
            .expect(201)
        expect(response.body.title).toBe(task)
        /* 
            Niveau 1
            expect(response.body.id).toEqual(expect.any(Number))
            Niveau 2
            expect(response.body).toEqual(expect.any(Object))
            expect(response.body).toEqual(expect.objectContaining({title: task, id: expect.any(Number)}))
        */
    })
    // afterEach

    // beforeEach
    test("POST /api/tasks - Add empty task", async () => {
        const task = null
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: task })
            .expect(400)
    })
    // afterEach

    // beforeEach
    test("GET /api/tasks - Read Tasks", async () => {
        await request(app).post('/api/tasks').send({ title: "Test"}).expect(201)
        const response = await request(app)
            .get('/api/tasks')
            .expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].title).toBe("Test")
    })
    // afterEach

    // beforeEach
    test("DELETE /api/tasks - 404 task dosnt exist", async () => {
        const response = await request(app)
            .delete('/api/tasks/9999')
            .expect(404)
    })
    // afterEach


    // afterAll
})

describe("Test Unitaire Exemple avec Middleware", () => {
    test("verifTask : Verifie les tasks reçu", () => {
        // verifTask reçois la requête req
        // Si tout est ok => next()
        // Si tout n'est pas ok => res.status(422)

        const req = {body: { title: "value" }}
        const response = verifTask(req, res, next()) // Utilisation d'un intercepteur nécessaire ( on verra plus tard :) )
        expect(response).toBe(true)
    })
})