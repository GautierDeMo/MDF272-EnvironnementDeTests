import type { Request, Response } from 'express';
import { getRealm } from '../config/realm.js';
import { v4 as uuidv4 } from 'uuid';

// Helper to format task for response
const formatTask = (task: any) => ({
  _id: task._id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate,
  userId: task.userId,
  tags: task.tags.map((tag: any) => ({
    _id: tag._id,
    name: tag.name,
    color: tag.color,
  })),
  subtasks: task.subtasks.map((st: any) => ({
    title: st.title,
    completed: st.completed,
  })),
  createdAt: task.createdAt,
});

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req: Request, res: Response) => {
  try {
    const realm = await getRealm();
    const tasks = realm.objects('Task')
      .filtered('userId == $0', req.user?.id)
      .sorted('createdAt', true);
    
    res.json({ success: true, tasks: tasks.map(formatTask) });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req: Request, res: Response) => {
  try {
    const realm = await getRealm();
    const task: any = realm.objectForPrimaryKey('Task', req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    if (task.userId !== req.user?.id) {
      return res.status(401).json({ success: false, error: 'User not authorized' });
    }

    res.json({ success: true, task: formatTask(task) });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, dueDate, priority, tags, subtasks } = req.body;

  try {
    const realm = await getRealm();
    
    const tagObjects = [];
    if (tags && tags.length > 0) {
      for (const tagId of tags) {
        const tag = realm.objectForPrimaryKey('Tag', tagId);
        if (tag) tagObjects.push(tag);
      }
    }

    let task: any;
    
    realm.write(() => {
      task = realm.create('Task', {
        _id: uuidv4(),
        userId: req.user?.id,
        title,
        description: description || '',
        status: status || 'pending',
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'medium',
        tags: tagObjects,
        subtasks: subtasks || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    res.json({ success: true, task: formatTask(task) });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: Request, res: Response) => {
  const { title, description, status, dueDate, priority, tags, subtasks } = req.body;

  try {
    const realm = await getRealm();
    const task: any = realm.objectForPrimaryKey('Task', req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    if (task.userId !== req.user?.id) {
      return res.status(401).json({ success: false, error: 'User not authorized' });
    }

    realm.write(() => {
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
      if (priority !== undefined) task.priority = priority;
      
      if (tags !== undefined) {
        const newTags = [];
        for (const tagId of tags) {
          const tag = realm.objectForPrimaryKey('Tag', tagId);
          if (tag) newTags.push(tag);
        }
        task.tags = newTags;
      }
      
      if (subtasks !== undefined) {
        task.subtasks = subtasks;
      }
      
      task.updatedAt = new Date();
    });

    res.json({ success: true, task: formatTask(task) });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const realm = await getRealm();
    const task: any = realm.objectForPrimaryKey('Task', req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    if (task.userId !== req.user?.id) {
      return res.status(401).json({ success: false, error: 'User not authorized' });
    }

    realm.write(() => {
      realm.delete(task);
    });
    
    res.json({ success: true, message: 'Task removed' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};