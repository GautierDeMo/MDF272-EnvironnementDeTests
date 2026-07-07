import Realm from 'realm';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UserSchema = {
  name: 'User',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    email: 'string',
    password: 'string',
    name: 'string',
    createdAt: 'date',
  },
};

export const TagSchema = {
  name: 'Tag',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    userId: 'string',
    name: 'string',
    color: 'string',
    createdAt: 'date',
  },
};

export const SubtaskSchema = {
  name: 'Subtask',
  embedded: true,
  properties: {
    title: 'string',
    completed: { type: 'bool', default: false },
  },
};

export const TaskSchema = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    userId: 'string',
    title: 'string',
    description: { type: 'string', optional: true },
    status: { type: 'string', default: 'pending' },
    dueDate: { type: 'date', optional: true },
    priority: { type: 'string', default: 'medium' },
    tags: 'Tag[]',
    subtasks: 'Subtask[]',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  const realmPath = path.join(__dirname, '../../taskmaster.realm');
  
  realmInstance = await Realm.open({
    path: realmPath,
    schema: [UserSchema, TagSchema, SubtaskSchema, TaskSchema],
    schemaVersion: 1,
  });

  return realmInstance;
};

process.on('SIGINT', () => {
  if (realmInstance && !realmInstance.isClosed) {
    realmInstance.close();
    console.log('Realm closed');
  }
  process.exit(0);
});