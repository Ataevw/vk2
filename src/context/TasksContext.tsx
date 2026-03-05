import type { RefObject, ReactNode } from 'react';
import { createContext } from 'react';
import useTasks from '../hooks/useTasks.js';
import useTaskIncScroll from '../hooks/useTaskIncScroll.js';
import useModal from '../hooks/useModal.js';

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export interface TasksContextType {
  tasks: Task[];
  tasksToShow: Task[];
  filteredTasks: Task[] | null;
  firstIncompliteTaskRef: RefObject<HTMLLIElement | null>;
  firstIncompliteTaskId: string | undefined;
  addTask: () => void;
  newTaskInputRef: React.RefObject<HTMLInputElement | null>;
  newTaskTitle: string;
  setNewTaskTitle: (newTitle: string) => void;
  deleteAllTasks: () => void;
  deleteTask: (taskId: string) => void;
  toggleTaskComplete: (taskId: string, isDone: boolean) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void; // вызывается для открытия/закрытия
  onConfirm: (() => void) | null;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext<TasksContextType>(
  {} as TasksContextType,
);

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const {
    tasks,
    setTasks,
    tasksToShow,
    filteredTasks,
    addTask,
    newTaskInputRef,
    newTaskTitle,
    setNewTaskTitle,
    deleteTask,
    toggleTaskComplete,
    searchQuery,
    setSearchQuery,
  } = useTasks();

  const { firstIncompliteTaskRef, firstIncompliteTaskId } =
    useTaskIncScroll(tasks);

  const { deleteAllTasks, isOpen, setIsOpen, onConfirm } = useModal(setTasks);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        tasksToShow,
        filteredTasks,
        firstIncompliteTaskRef,
        firstIncompliteTaskId,
        addTask,
        newTaskInputRef,
        newTaskTitle,
        deleteAllTasks,
        setNewTaskTitle,
        deleteTask,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        isOpen,
        setIsOpen,
        onConfirm,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
