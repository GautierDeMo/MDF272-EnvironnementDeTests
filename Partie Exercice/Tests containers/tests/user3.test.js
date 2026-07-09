const app = require('../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const connectDB = require('./../src/db')
const {MongoDBContainer} = require('@testcontainers/mongodb')

describe('User API - updateUser & deleteUser', () => {
    jest.setTimeout(60000)
    let container, db

    beforeAll(async () => {
        container = await new MongoDBContainer("mongo:8.2.5").start()
        db = mongoose.createConnection(container.getConnectionString(), {
            directConnection: true
        })
        process.env.MONGO_URI = container.getConnectionString()
        await connectDB()
    })

    afterAll(async () => {
        await db.close()
        await container.stop()
    })

    afterEach(async () => {
        await mongoose.connection.dropDatabase()
    })

    describe('updateUser - PUT /users/:id', () => {
        it('devrait mettre à jour le nom d\'un utilisateur existant', async () => {
            // AAA 🍻
            // Arrange : on crée d'abord un utilisateur via l'API
            const createResponse = await request(app)
                .post('/users')
                .send({name: 'NomInitial'})
                .expect(201)

            const userId = createResponse.body.user._id

            // Act : on met à jour son nom
            const updateResponse = await request(app)
                .put(`/users/${userId}`)
                .send({name: 'NomModifie'})
                .expect(200)

            // Assert
            expect(updateResponse.body.name).toBe('NomModifie')
            expect(updateResponse.body._id).toBe(userId)
        })

        it('devrait retourner 404 si l\'utilisateur n\'existe pas', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString()

            const response = await request(app)
                .put(`/users/${fakeId}`)
                .send({name: 'PeuImporte'})
                .expect(404)

            expect(response.body.message).toBe('User not found')
        })

        it('devrait retourner 500 si l\'id fourni est invalide', async () => {
            const response = await request(app)
                .put('/users/id-invalide')
                .send({name: 'PeuImporte'})
                .expect(500)

            expect(response.body.error).toBeDefined()
        })
    })

    describe('deleteUser - DELETE /users/:id', () => {
        it('devrait supprimer un utilisateur existant et retourner 204', async () => {
            // Arrange
            const createResponse = await request(app)
                .post('/users')
                .send({name: 'AsSupprimer'})
                .expect(201)

            const userId = createResponse.body.user._id

            // Act
            await request(app)
                .delete(`/users/${userId}`)
                .expect(204)

            // Assert : l'utilisateur ne doit plus exister en base
            const getResponse = await request(app)
                .get(`/users/${userId}`)
                .expect(404)

            expect(getResponse.body.message).toBe('User not found')
        })

        it('devrait retourner 404 si l\'utilisateur à supprimer n\'existe pas', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString()

            const response = await request(app)
                .delete(`/users/${fakeId}`)
                .expect(404)

            expect(response.body.message).toBe('User not found')
        })
    })
})
