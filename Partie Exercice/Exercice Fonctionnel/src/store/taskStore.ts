import { create } from 'zustand';
import api from '../services/api';

export interface Subtask {
  title: string;
  completed: boolean;
}

export interface Tag {
  _id: string;
  name: string;
  color: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  tags: Tag[];
  subtasks: Subtask[];
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  tags: Tag[];
  loading: boolean;
  getTasks: () => Promise<void>;
  getTags: () => Promise<void>;
  createTask: (taskData: any) => Promise<void>;
  updateTask: (id: string, taskData: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  createTag: (tagData: any) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  tags: [],
  loading: false,

  getTasks: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/tasks');
      set({ tasks: res.data.tasks, loading: false });
    } catch (error) {
      console.error('Error fetching tasks', error);
      set({ loading: false });
    }
  },

  getTags: async () => {
    try {
      const res = await api.get('/tags');
      set({ tags: res.data.tags });
    } catch (error) {
      console.error('Error fetching tags', error);
    }
  },

  createTask: async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      set((state) => ({ tasks: [res.data.task, ...state.tasks] }));
    } catch (error) {
      console.error('Error creating task', error);
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const res = await api.put(`/tasks/${id}`, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? res.data.task : task
        ),
      }));
    } catch (error) {
      console.error('Error updating task', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting task', error);
      throw error;
    }
  },

  createTag: async (tagData) => {
    try {
      const res = await api.post('/tags', tagData);
      set((state) => ({ tags: [...state.tags, res.data.tag] }));
    } catch (error) {
      console.error('Error creating tag', error);
      throw error;
    }
  },

  deleteTag: async (id) => {
    try {
      await api.delete(`/tags/${id}`);
      set((state) => ({
        tags: state.tags.filter((tag) => tag._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting tag', error);
      throw error;
    }
  },
}));