import type { Task } from '../context/TasksContext.js';

const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null,
    saveTasks,
  };
};

export default useTasksLocalStorage;
