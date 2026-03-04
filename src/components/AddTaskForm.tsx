import { useContext } from 'react';
import Button from './Buttons.js';
import Field from './Field.js';
import { TasksContext } from '../context/TasksContext.js';

const AddTaskForm = () => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext);

  const onSubmit = (event: any) => {
    event.preventDefault(); // чтобы не перезагружать страницу, останавливаем браузерное поведение!
    addTask();
  };

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        className="todo__field"
        id="new-task"
        label="New task title"
        value={newTaskTitle}
        onInput={setNewTaskTitle}
        ref={newTaskInputRef}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;
