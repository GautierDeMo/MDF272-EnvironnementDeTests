// Dépendance
const app = require('../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const connectDB = require('./../src/db')
const { MongoDBContainer } = require('@testcontainers/mongodb')

describe('User API', () => {
    // Augmentation du TimeOut, utile pour les opérations asynchrones et le pull image
    jest.setTimeout(60000);
    let container, db
    beforeAll(async () => {
        // Création du container et démarrage de celui-ci
        container = await new MongoDBContainer("mongo:8.2.5").start()
        // Création d'une connection à la base de données du container
        db = mongoose.createConnection(container.getConnectionString(), {
            directConnection: true
        })
        // Utilisation avec une base de donnée lié à l'API :
        //  - On récupère la connection ( connectDB ) => const connectDB = require('./../src/db')
        //  - On setup la variable d'environnement : process.env.MONGO_URI avec la connection string : container.getConnectionString()
        process.env.MONGO_URI = container.getConnectionString()
        //  - On appelle la connection connectDB()
        await connectDB()
        //  - On peut lancer les tests ( avec connect pas de déco nécessaire cette fois )
    })
    afterAll(async () => {
        await db.close()
    })

    it('Should create a user', async() => {
        const collection = db.collection("testy")
        await collection.insertOne({test : 1})

        const result = await collection.findOne({test : 1})
        expect(result.test).toEqual(1)
    })
    // Test Unitaire ci-dessus

    // Test Fonctionnel ci-dessous
    it('Should create a user', async () => {
        const name = 'MaeldelaPluie'
        const response = await request(app)
        .post('/users')
        .send({ name })
        .expect(201)

    expect(response.body.user.name).toBe(name)
    })
})
