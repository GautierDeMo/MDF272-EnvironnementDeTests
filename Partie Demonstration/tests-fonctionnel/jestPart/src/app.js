const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api', todoRoutes);

// Middleware pour les erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée." });
});

// Middleware pour les erreurs serveur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur." });
});

module.exports = app;