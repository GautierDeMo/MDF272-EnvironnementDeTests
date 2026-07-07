let tasks = [];

class TodoApp {
  static addTask(title) {
    const task = { id: Date.now(), title, completed: false };
    tasks.push(task);
    return task;
  }

  static completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      return true;
    }
    return false;
  }

  static listTasks() {
    return [...tasks];
  }

  static deleteTask(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    return tasks.length !== initialLength;
  }

  static resetTasks() {
    tasks = [];
  }
}

module.exports = TodoApp;