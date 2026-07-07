import request from 'supertest'
import app from '../api/app'
import { getRealm } from '../api/config/realm'
import Realm from 'realm'

describe("Tests fonctionnels de l'endpoint '/auth' de l'API", () => {
  beforeAll(() => { Realm.deleteFile({ path: process.env.REALM_PATH }) })

  afterAll(async () => {
    const realmInstance = await getRealm()
    realmInstance.close()
    Realm.flags.ALLOW_CLEAR_TEST_STATE = true
    Realm.clearTestState()
  })

  test('POST /api/auth/register - Register a new user', async () => {
    const newUser = {
      name: 'Solène',
      email: 'solenepingouin@test.com',
      password: 'azertyuiop123'
    }

    // Le format des données attendus dans la requête
    // préparer le jeu de données qu'on va tester

    // Il nous faut l'app,
    const response = await request(app)
    // l'endpoint,
      .post('/api/auth/register')
    // On envoie le jeu de données
      .send(newUser)
    // Ce qu'on expect en statut
      .expect(201)
    // le expect('ngzougfnzeipof') du test avec Jest

    // Utiliser le matcher d'objectContains avec ce format là
    // et des fois avec anyNumber quand on a pas la donnée, et des fois avec une vérif exacte
    // success: true,
    // token: generateToken(user._id),
    // user: {
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    // },
    expect(response.body).toStrictEqual(expect.objectContaining({
      success: true,
      token: expect.any(String),
      user: {
        id: expect.any(String),
        name: newUser.name,
        email: newUser.email
      }
    }))
  })
})
