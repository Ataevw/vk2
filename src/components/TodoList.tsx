import { memo, useContext } from 'react';
import TodoItem from './TodoItem.js';
import { TasksContext } from '../context/TasksContext.js';

const TodoList = () => {
  const {
    tasksToShow,
    filteredTasks
  } = useContext(TasksContext);
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
        <TodoItem {...task} key={task.id} />
      ))}
    </ul>
  );
};

export default memo(TodoList);
