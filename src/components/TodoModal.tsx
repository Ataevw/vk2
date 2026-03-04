interface TodoModalProps {
  isOpen: boolean; // теперь модалка "контролируется" извне
  setIsOpen: (isOpen: boolean) => void; // вызывается для открытия/закрытия
  onConfirm?: () => void;
  children: React.ReactNode; // любое, что можно отрендерить в JSX
}

const TodoModal = ({
  isOpen,
  setIsOpen,
  onConfirm,
  children,
}: TodoModalProps) => {
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
