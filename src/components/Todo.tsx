import AddTaskForm from './AddTaskForm.js';
import SearchTaskForm from './SearchTaskForm.js';
import TodoInfo from './TodoInfo.js';
import TodoList from './TodoList.js';
import TodoModal from './TodoModal.js';

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

const Todo = () => {
  // Список задач с типом Task[]
  const taskList: Task[] = [
    { id: '1', title: 'Task 1', isDone: true },
    { id: '2', title: 'Task 2', isDone: true },
    { id: '3', title: 'Task 3', isDone: true },
    { id: '4', title: 'Task 1', isDone: true },
    { id: '5', title: 'Task 2', isDone: true },
    { id: '6', title: 'Task 3', isDone: true },
    { id: '7', title: 'Task 3', isDone: false },
    { id: '8', title: 'Task 3', isDone: true },
    { id: '9', title: 'Task 3', isDone: true },
    { id: '10', title: 'Task 3', isDone: true },
    { id: '11', title: 'Task 3', isDone: true },
    { id: '12', title: 'Task 3', isDone: true },
    { id: '13', title: 'Task 3', isDone: false },
    { id: '14', title: 'Task 3', isDone: true },
    { id: '15', title: 'Task 3', isDone: true },
    { id: '16', title: 'Task 3', isDone: true },
  ];

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <TodoModal />
      <SearchTaskForm />
      <TodoInfo total={taskList.length} done={taskList.filter(({isDone}) => isDone).length}/>
      <TodoList taskList={taskList} />
    </div>
  );
};

export default Todo;
