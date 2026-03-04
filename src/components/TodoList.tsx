import { memo } from 'react';
import TodoItem from './TodoItem.js';

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

interface TodoListProps {
  tasksToShow: Task[]; // массив задачь
  onDeleteTaskButtonClick: (taskId: string) => void;
  onTaskCompleteChange: (taskId: string, isDone: boolean) => void;
  filteredTasks: Task[] | null;
  firstIncompliteTaskRef: React.RefObject<HTMLLIElement | null>;
  firstIncompliteTaskId: string | undefined;
}

const TodoList = ({
  onDeleteTaskButtonClick,
  onTaskCompleteChange,
  tasksToShow,
  filteredTasks,
  firstIncompliteTaskRef,
  firstIncompliteTaskId,
}: TodoListProps) => {
  const hasTasks: boolean = tasksToShow.length > 0;
  const isEmptyFilteredTasks: boolean = filteredTasks?.length === 0;

  if (!hasTasks) {
    return <div className="todo__empty-message">Задач нет</div>;
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return (
      <div className="todo__empty-message">По запросу ничего не найдено!</div>
    );
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasksToShow).map((task) => (
        <TodoItem
          {...task}
          key={task.id}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
          ref={
            task.id === firstIncompliteTaskId ? firstIncompliteTaskRef : null
          }
        />
      ))}
    </ul>
  );
};

export default memo(TodoList);
