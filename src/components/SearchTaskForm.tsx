import Field from "./Field.js";

const SearchTaskForm = () => {
  return (
    <form className="todo__form">
      <Field className="todo__field" id="search-task" label="Search task" type="search" />
    </form>
  );
};

export default SearchTaskForm;
