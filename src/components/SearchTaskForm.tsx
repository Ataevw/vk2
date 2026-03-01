import Field from './Field.js';

interface SearchTaskFormProps {
  onSearchInput: (query: string) => void;
}

const SearchTaskForm = (props: SearchTaskFormProps) => {
  const { onSearchInput } = props;

  return (
    <form className="todo__form" onSubmit={(event) => event.preventDefault() }>
      <Field
        className="todo__field"
        id="search-task"
        label="Search task"
        type="search"
        onInput={(query) => onSearchInput(query)}
      />
    </form>
  );
};

export default SearchTaskForm;
