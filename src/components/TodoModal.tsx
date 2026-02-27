import { useState } from 'react';

const TodoModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        Ссылка
      </a>
      {isOpen && (
        <div
          className="modal"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className="modal__content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Модальное окно</h2>
            <button
              className="button"
              type="submit"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoModal;
