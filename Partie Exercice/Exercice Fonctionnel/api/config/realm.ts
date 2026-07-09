import Realm from 'realm';
import path from 'node:path';

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
} satisfies Realm.ObjectSchema;

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
} satisfies Realm.ObjectSchema;

export const SubtaskSchema = {
  name: 'Subtask',
  embedded: true,
  properties: {
    title: 'string',
    completed: { type: 'bool', default: false },
  },
} satisfies Realm.ObjectSchema;

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
} satisfies Realm.ObjectSchema;

let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  const realmPath = process.env.REALM_PATH ?? path.resolve(process.cwd(), 'taskmaster.realm');

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
