const path = require('node:path')

process.env.JWT_SECRET = 'test-secret'
process.env.REALM_PATH = path.join(
  __dirname, 'Partie Exercice', 'Tests Unitaire', 'Exercice Fonctionnel', 'tests', 'test.realm',
)
