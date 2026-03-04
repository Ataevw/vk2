import Button from './Buttons.js';
import Field from './Field.js';

interface AddTaskFormProps {
  addTask: () => void;
  newTaskInputRef: React.RefObject<HTMLInputElement | null>;
  newTaskTitle: string;
  setNewTaskTitle: (newTitle: string) => void;
}

const AddTaskForm = (props: AddTaskFormProps) => {
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = props;

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
