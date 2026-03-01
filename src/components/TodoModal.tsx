import { useState } from 'react';

interface TodoModalProps {
  onOpenModal: () => void;
}

const TodoModal = (props: TodoModalProps) => {
  const { onOpenModal } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <a
        href=""
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
          onOpenModal();
        }}
      >
        Ссылка
      </a>
      {isOpen && (
        <div
          className="modal"
          onClick={() => {
            setIsOpen(false);
            onOpenModal();
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
                onOpenModal();
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
