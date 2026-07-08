import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../api/app'
import { getRealm } from '../../api/config/realm'
import Realm from 'realm'

const userId = '1234567890'
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
})

describe("Tests fonctionnels de l'endpoint '/tags' de l'API", () => {
    beforeAll(() => {
        Realm.deleteFile({ path: process.env.REALM_PATH })
    })

    afterAll(async () => {
        const realmInstance = await getRealm()
        realmInstance.close()
        Realm.flags.ALLOW_CLEAR_TEST_STATE = true
        Realm.clearTestState()
    })

    describe('POST /api/tags', () => {
        test('crée une tâche avec succès', async () => {
            const newTag = {
                name: 'Solène',
                color: '#000000',
            }

            const response = await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send(newTag)

            expect(response.status).toBe(200)
            expect(response.body).toStrictEqual(
                expect.objectContaining({
                    success: true,
                    tag: expect.objectContaining({
                        name: newTag.name,
                        color: newTag.color,
                        userId,
                    }),
                })
            )
        })

        test('rejette un tag si nom est manquant', async () => {
            const newTagWithoutName = {
                color: '#000000',
            }

            const response = await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send(newTagWithoutName)

            expect(response.status).toBe(400)
            expect(JSON.parse(response.text).errors[0].msg).toBe('Name is required')
        })

        test('rejette la requête sans token', async () => {
            const response = await request(app)
                .post('/api/tags')
                .send({ name: 'Sans token', color: '#111111' })

            expect(response.status).toBe(401)
            expect(response.body.error).toMatch(/no token/i)
        })

        test('rejette un token invalide', async () => {
            const response = await request(app)
                .post('/api/tags')
                .set('Authorization', 'Bearer token.invalide')
                .send({ name: 'Token invalide', color: '#222222' })

            expect(response.status).toBe(401)
            expect(response.body.error).toMatch(/token failed/i)
        })
    })

    describe("GET /api/tags", () => {
        test('retourne uniquement les tags de l\'utilisateur courant', async () => {
            await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Tag A', color: '#aaaaaa' })

            const response = await request(app)
                .get('/api/tags')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(Array.isArray(response.body.tags)).toBe(true)
            expect(
                response.body.tags.every((tag: any) => tag.userId === userId)
            ).toBe(true)
        })

        test('rejette la requête sans token', async () => {
            const response = await request(app).get('/api/tags')
            expect(response.status).toBe(401)
        })
    })

    describe("DELETE /api/tags/:id", () => {
        test('supprime un tag appartenant à l\'utilisateur', async () => {
            const createRes = await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'A supprimer', color: '#333333' })

            const tagId = createRes.body.tag._id

            const response = await request(app)
                .delete(`/api/tags/${tagId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
        })

        test('retourne 404 si le tag n\'existe pas', async () => {
            const response = await request(app)
                .delete('/api/tags/inexistant-id')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404)
        })

        test('retourne 401 si le tag appartient à un autre utilisateur', async () => {
            const otherToken = jwt.sign(
                { id: 'un-autre-user-id' },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            )

            const createRes = await request(app)
                .post('/api/tags')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Pas a toi', color: '#444444' })

            const tagId = createRes.body.tag._id

            const response = await request(app)
                .delete(`/api/tags/${tagId}`)
                .set('Authorization', `Bearer ${otherToken}`)

            expect(response.status).toBe(401)
            expect(response.body.error).toMatch(/not authorized/i)
        })
    })
})
