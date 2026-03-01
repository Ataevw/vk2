interface TodoInfoProps {
  total: number;
  done: number;
  onDeleteAllButtonClick: () => void; // тип возвращаемого значения. В данном случае функция ничего не возвращает.
}

const TodoInfo = (props: TodoInfoProps) => {
  const { total, done, onDeleteAllButtonClick } = props;

  const hasTasks = total > 0;

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={onDeleteAllButtonClick}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default TodoInfo;
