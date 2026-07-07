import express from 'express';
import { check } from 'express-validator';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getTasks);

router.get('/:id', protect, getTask);

router.post(
  '/',
  [
    protect,
    check('title', 'Title is required').not().isEmpty(),
  ],
  createTask
);

router.put('/:id', protect, updateTask);

router.delete('/:id', protect, deleteTask);

export default router;