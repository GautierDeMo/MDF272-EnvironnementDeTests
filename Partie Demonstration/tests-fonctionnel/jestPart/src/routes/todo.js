const express = require('express');
const TodoApp = require('../models/todo');
const router = express.Router();

// Ajouter une tâche
router.post('/tasks', /* verifTask, */ (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Le titre est requis." });
  const task = TodoApp.addTask(title);
  res.status(201).json(task);
});

// Lister les tâches
router.get('/tasks', (req, res) => {
  const tasks = TodoApp.listTasks();
  res.json(tasks);
});

// Marquer une tâche comme terminée
router.patch('/tasks/:id/complete', (req, res) => {
  const { id } = req.params;
  const result = TodoApp.completeTask(Number(id));
  if (!result) return res.status(404).json({ error: "Tâche non trouvée." });
  res.json({ success: true });
});

// Supprimer une tâche
router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const result = TodoApp.deleteTask(Number(id));
  if (!result) return res.status(404).json({ error: "Tâche non trouvée." });
  res.json({ success: true });
});

module.exports = router;