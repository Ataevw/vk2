import Button from './Buttons.js';
import Field from './Field.js';

interface AddTaskFormProps {
  addTask: () => void;
}

const AddTaskForm = (props: AddTaskFormProps) => {
  const { addTask } = props;

  const onSubmit = (event: any) => {
    event.preventDefault(); // чтобы не перезагружать страницу, останавливаем браузерное поведение! 
    addTask();
  };

  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field className="todo__field" id="new-task" label="New task title" />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;
