import request from 'supertest'
import app from '../api/app'
import { getRealm } from '../api/config/realm'
import Realm from 'realm'

const newUser = {
  name: 'Solène',
  email: 'solenepingouin@test.com',
  password: 'azertyuiop123'
}

async function registerUser() {
  return await request(app).post('/api/auth/register').send(newUser)
}

async function loginUser() {
  return await request(app).post('/api/auth/login').send({ email: newUser.email, password: newUser.password })
}

beforeEach(() => {
  Realm.deleteFile({ path: process.env.REALM_PATH })
})

describe('/api/auth/register', () => {

  test('POST - Register a new user', async () => {

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser)
      .expect(201)

    expect(response.body).toStrictEqual(expect.objectContaining(
      {
        success: true,
        token: expect.any(String),
        user: {
          id: expect.any(String),
          name: newUser.name,
          email: newUser.email
        }
      }
    ))

    /* If we want to check only if a property exists, we can use : */
    // expect(res.body.user).toHaveProperty('name');

    /* We can also write an except for every property in an object if we want more granularity to find an error or
    something else */
    // expect(response.body.success).toBeTruthy()
    // expect(response.body.token).toStrictEqual(expect.any(String))
    // expect(response.body.user).toStrictEqual(expect.objectContaining(
    //   {
    //     id: expect.any(String),
    //     name: newUser.name,
    //     email: newUser.email
    //   }
    // ))
  })

  test("POST - I can't register a new user if the user doesn't have a name", async () => {

    const newUserWithoutName = {
      email: 'solenepingouin@test.com',
      password: 'azertyuiop123'
    }

    const error = 'Name is required'

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUserWithoutName)

    expect(response.status).toBe(400)
    expect(JSON.parse(response.text).errors[0].msg).toBe(error)
  })

  test("POST - I can't register a new user if my email isn't valid", async () => {

    const newUserWithoutValidEmail = {
      name: 'Solène',
      email: 'solenepingouintest.com',
      password: 'azertyuiop123'
    }

    const error = 'Please include a valid email'

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUserWithoutValidEmail)

    expect(response.status).toBe(400)
    expect(JSON.parse(response.text).errors[0].msg).toBe(error)
  })

  test("POST - I can't register a new user if my password has less than 6 characters", async () => {
    const newUserWithoutLongPassword = {
      name: 'Solène',
      email: 'solenepingouin@test.com',
      password: 'azert'
    }

    const error = 'Please enter a password with 6 or more characters'

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUserWithoutLongPassword)

    expect(response.status).toBe(400)
    expect(JSON.parse(response.text).errors[0].msg).toBe(error)
  })
})

afterEach(async () => {
  const realmInstance = await getRealm()
  realmInstance.close()
  Realm.flags.ALLOW_CLEAR_TEST_STATE = true
  Realm.clearTestState()
})

describe('/api/auth/login', () => {

  beforeEach(async () => {
    await registerUser()
  })

  test("POST - I can login to my account", async () => {

    const loginResponse = await loginUser()

    expect(loginResponse.body).toStrictEqual(expect.objectContaining(
      {
        success: true,
        token: expect.any(String),
        user: {
          id: loginResponse.body.user.id,
          name: loginResponse.body.user.name,
          email: loginResponse.body.user.email
        }
      }
    ))
  })

  test("POST - I can't login if my email is not valid", async () => {

    const error = 'Please include a valid email'

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'solenepingouintest.com', password: newUser.password })

    expect(loginResponse.status).toBe(400)
    expect(JSON.parse(loginResponse.text).errors[0].msg).toBe(error)
  })

  test("POST - I can't login if my password is missing", async () => {

    const error = 'Password is required'

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: newUser.email, })

    expect(loginResponse.status).toBe(400)
    expect(JSON.parse(loginResponse.text).errors[0].msg).toBe(error)
  })
})

describe('/api/auth/me', () => {

  let token: string

  beforeEach(async () => {
    await registerUser()
    const loginResponse = await loginUser()
    token = loginResponse.body.token
  })

  test("GET - I can get data about myself as a user", async () => {
    const meResponse = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(meResponse.body).toStrictEqual(expect.objectContaining(
      {
        success: true,
        user: {
          id: meResponse.body.user.id,
          name: meResponse.body.user.name,
          email: meResponse.body.user.email
        }
      }
    ))
  })
})
