import Todo from './components/Todo.js';
import { TasksProvider } from './context/TasksContext.js';

const App = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default App;
