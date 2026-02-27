import AddTaskForm from './AddTaskForm.js';
import SearchTaskForm from './SearchTAskForm.js';
import TodoInfo from './TodoInfo.js';
import TodoList from './TodoList.js';
import TodoModal from './TodoModal.js';

const Todo = () => {
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <TodoModal />
      <SearchTaskForm />
      <TodoInfo />
      <TodoList />
    </div>
  );
};

export default Todo;
