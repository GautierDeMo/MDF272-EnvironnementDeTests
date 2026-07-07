import express from 'express';
import { check } from 'express-validator';
import { getTags, createTag, deleteTag } from '../controllers/tagController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getTags);

router.post(
  '/',
  [
    protect,
    check('name', 'Name is required').not().isEmpty(),
  ],
  createTag
);

router.delete('/:id', protect, deleteTag);

export default router;