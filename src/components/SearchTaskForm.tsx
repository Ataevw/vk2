import { useContext } from 'react';
import Field from './Field.js';
import { TasksContext } from '../context/TasksContext.js';

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
      <Field
        className="todo__field"
        id="search-task"
        label="Search task"
        type="search"
        value={searchQuery}
        onInput={(query) => setSearchQuery(query)}
      />
    </form>
  );
};

export default SearchTaskForm;
