import { useContext } from 'react';
import AddTaskForm from './AddTaskForm.js';
import SearchTaskForm from './SearchTaskForm.js';
import TodoInfo from './TodoInfo.js';
import TodoList from './TodoList.js';
import TodoModal from './TodoModal.js';
import Button from './Buttons.js';
import { TasksContext } from '../context/TasksContext.js';

const Todo = () => {
  const { firstIncompliteTaskRef, setIsOpen } = useContext(TasksContext)!;

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <div>
        <a
          href=""
          onClick={(e) => {
            (e.preventDefault(), setIsOpen(true));
          }}
        >
          Ссылка
        </a>
      </div>
      <SearchTaskForm />
      <TodoInfo />
      <Button
        onClick={() =>
          firstIncompliteTaskRef.current?.scrollIntoView({
            behavior: 'smooth',
          })
        }
      >
        Показать первую не выбранную
      </Button>
      <TodoList />

      {/* Модалки */}
      <TodoModal>Модалка обычная</TodoModal>
      <TodoModal>Точно вы хотите удалить задачу?</TodoModal>
    </div>
  );
};

export default Todo;
