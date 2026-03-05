import { useRef } from 'react';
import type { Task } from '../context/TasksContext.js';

const useTaskIncScroll = (tasks: Task[]) => {
  const firstIncompliteTaskRef = useRef<HTMLLIElement>(null);
  const firstIncompliteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  return {
    firstIncompliteTaskRef,
    firstIncompliteTaskId,
  };
};

export default useTaskIncScroll;
