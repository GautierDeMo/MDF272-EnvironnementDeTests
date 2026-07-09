const express = require('express')
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('./../middlewares/users.middleware')
const app = express()

app.use(express.json())

app.post('/users', createUser)
app.get('/users', getAllUsers)
app.get('/users/:id', getUserById)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

module.exports = app
