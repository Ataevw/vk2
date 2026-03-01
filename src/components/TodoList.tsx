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
}

const TodoList = ({
  onDeleteTaskButtonClick,
  onTaskCompleteChange,
  tasksToShow,
}: TodoListProps) => {
  
  const hasTasks: boolean = true;

  if (!hasTasks) {
    return <div className="todo__empty-message"></div>;
  }

  return (
    <ul className="todo__list">
      {tasksToShow.map((task) => (
        <TodoItem
          {...task}
          key={task.id}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  );
};

export default TodoList;
