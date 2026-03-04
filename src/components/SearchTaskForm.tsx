import Field from './Field.js';

interface SearchTaskFormProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const SearchTaskForm = (props: SearchTaskFormProps) => {
  const { searchQuery, setSearchQuery } = props;

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
