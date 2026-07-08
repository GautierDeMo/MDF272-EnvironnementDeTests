import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../api/app'
import {getRealm} from '../api/config/realm'
import Realm from 'realm'

const userId = '1234567890'
const token = jwt.sign({id: userId}, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
})

describe("Tests fonctionnels de l'endpoint '/tasks' de l'API", () => {
    beforeAll(() => {
        Realm.deleteFile({path: process.env.REALM_PATH})
    })

    afterAll(async () => {
        const realmInstance = await getRealm()
        realmInstance.close()
        Realm.flags.ALLOW_CLEAR_TEST_STATE = true
        Realm.clearTestState()
    })

    describe('POST /api/tasks', () => {
        test('crée une tâche avec succès', async () => {
            const newTask = {
                title: 'Faire les tests',
                description: 'Écrire les tests fonctionnels des tasks',
                priority: 'high',
            }

            const response = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send(newTask)

            expect(response.status).toBe(200)
            expect(response.body).toStrictEqual(
                expect.objectContaining({
                    success: true,
                    task: expect.objectContaining({
                        title: newTask.title,
                        description: newTask.description,
                        priority: newTask.priority,
                        status: 'pending',
                        userId,
                        tags: [],
                        subtasks: [],
                    }),
                })
            )
        })

        test('applique les valeurs par défaut (status, priority)', async () => {
            const response = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Tâche minimale'})

            expect(response.status).toBe(200)
            expect(response.body.task.status).toBe('pending')
            expect(response.body.task.priority).toBe('medium')
        })

        test('associe des tags existants à la tâche', async () => {
            const tagRes = await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send({name: 'Urgent', color: '#ff0000'})

            const tagId = tagRes.body.tag._id

            const response = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Tâche avec tag', tags: [tagId]})

            expect(response.status).toBe(200)
            expect(response.body.task.tags).toHaveLength(1)
            expect(response.body.task.tags[0]).toEqual(
                expect.objectContaining({_id: tagId, name: 'Urgent', color: '#ff0000'})
            )
        })

        test('rejette une tâche sans titre', async () => {
            const response = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({description: 'Pas de titre'})

            expect(response.status).toBe(400)
            expect(JSON.parse(response.text).errors[0].msg).toBe('Title is required')
        })

        test('rejette la requête sans token', async () => {
            const response = await request(app)
                .post('/api/tasks')
                .send({title: 'Sans token'})

            expect(response.status).toBe(401)
            expect(response.body.error).toMatch(/no token/i)
        })

        test('rejette un token invalide', async () => {
            const response = await request(app)
                .post('/api/tasks')
                .set('Authorization', 'Bearer token.invalide')
                .send({title: 'Token invalide'})

            expect(response.status).toBe(401)
            expect(response.body.error).toMatch(/token failed/i)
        })
    })

    describe('GET /api/tasks', () => {
        test('retourne uniquement les tâches de l\'utilisateur courant', async () => {
            const response = await request(app)
                .get('/api/tasks')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(Array.isArray(response.body.tasks)).toBe(true)
            expect(
                response.body.tasks.every((task: any) => task.userId === userId)
            ).toBe(true)
        })

        test('rejette la requête sans token', async () => {
            const response = await request(app).get('/api/tasks')
            expect(response.status).toBe(401)
        })
    })

    describe('GET /api/tasks/:id', () => {
        test('retourne une tâche par son id', async () => {
            const createRes = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Tâche à récupérer'})

            const taskId = createRes.body.task._id

            const response = await request(app)
                .get(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.task._id).toBe(taskId)
        })

        test('retourne 404 si la tâche n\'existe pas', async () => {
            const response = await request(app)
                .get('/api/tasks/inexistant-id')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)
        })

        test('retourne 401 si la tâche appartient à un autre utilisateur', async () => {
            const otherToken = jwt.sign(
                {id: 'un-autre-user-id'},
                process.env.JWT_SECRET as string,
                {expiresIn: '1h'}
            )

            const createRes = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Pas à toi'})

            const taskId = createRes.body.task._id

            const response = await request(app)
                .get(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${otherToken}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toMatch(/not authorized/i)
        })
    })

    describe('PUT /api/tasks/:id', () => {
        test('met à jour une tâche', async () => {
            const createRes = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Avant modification'})

            const taskId = createRes.body.task._id

            const response = await request(app)
                .put(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Après modification', status: 'completed'})

            expect(response.status).toBe(200)
            expect(response.body.task.title).toBe('Après modification')
            expect(response.body.task.status).toBe('completed')
        })

        test('retourne 404 si la tâche n\'existe pas', async () => {
            const response = await request(app)
                .put('/api/tasks/inexistant-id')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Peu importe'})

            expect(response.status).toBe(404)
        })

        test('retourne 401 si la tâche appartient à un autre utilisateur', async () => {
            const otherToken = jwt.sign(
                {id: 'un-autre-user-id'},
                process.env.JWT_SECRET as string,
                {expiresIn: '1h'}
            )

            const createRes = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Pas à toi (update)'})

            const taskId = createRes.body.task._id

            const response = await request(app)
                .put(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${otherToken}`)
                .send({title: 'Tentative modification'})

            expect(response.status).toBe(401)
        })
    })

    describe('DELETE /api/tasks/:id', () => {
        test('supprime une tâche appartenant à l\'utilisateur', async () => {
            const createRes = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'À supprimer'})

            const taskId = createRes.body.task._id

            const response = await request(app)
                .delete(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
        })

        test('retourne 404 si la tâche n\'existe pas', async () => {
            const response = await request(app)
                .delete('/api/tasks/inexistant-id')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)
        })

        test('retourne 401 si la tâche appartient à un autre utilisateur', async () => {
            const otherToken = jwt.sign(
                {id: 'un-autre-user-id'},
                process.env.JWT_SECRET as string,
                {expiresIn: '1h'}
            )

            const createRes = await request(app)
                .post('/api/tasks')
                .set('Authorization', `Bearer ${token}`)
                .send({title: 'Pas à toi (delete)'})

            const taskId = createRes.body.task._id

            const response = await request(app)
                .delete(`/api/tasks/${taskId}`)
                .set('Authorization', `Bearer ${otherToken}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toMatch(/not authorized/i)
        })
    })
})
