import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext.js';

interface TodoModalProps {
  children: React.ReactNode; // любое, что можно отрендерить в JSX
}

const TodoModal = ({ children }: TodoModalProps) => {
  const { isOpen, setIsOpen, onConfirm } = useContext(TasksContext);
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={() => setIsOpen(false)}>
      {/* stopPropagation отключаем закрытие по клику в любую область */}
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2>Модальное окно</h2>
        <p>{children}</p>
        {onConfirm && (
          <button className="button" type="button" onClick={onConfirm}>
            Да, удалить
          </button>
        )}
        <button
          className="button"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
