import { useState } from 'react';
import type { Task } from '../context/TasksContext.js';

const useModal = (setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  // Модальное окно
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Модальное окно — cогласие на удаление
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  // Открытие модалки на удаление (мемонизированно)
  // useCallback — запоинаем функцию между рендерами (пока не изменились зависимости)
  const deleteAllTasks = () => {
    setOnConfirm(() => confirmDeleteAll);
    setIsOpen(true);
  };

  // Удалить все задачи
  const confirmDeleteAll = () => {
    console.log('Удаляем все задачи');

    setTasks([]); // очистка задачь (удаление)
    setIsOpen(false); // закрытие модалки
    setOnConfirm(null);
  };

  return {
    isOpen,
    setIsOpen,
    deleteAllTasks,
    onConfirm,
  };
};

export default useModal;
