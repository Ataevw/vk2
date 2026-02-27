import Button from "./Buttons.js";
import Field from "./Field.js";

const AddTaskForm = () => {
  return (
    <form className="todo__form">
      <Field />
      <Button />
    </form>
  );
};

export default AddTaskForm;
