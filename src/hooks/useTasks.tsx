import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useTasksLocalStorage from './useTasksLocalStorage.js';

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

const useTasks = () => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();

  const [tasks, setTasks] = useState<Task[]>(
    savedTasks ?? [
      { id: '1', title: 'Task 1', isDone: false },
      { id: '2', title: 'Task 2', isDone: false },
      { id: '3', title: 'Task 3', isDone: false },
      { id: '4', title: 'Task 1', isDone: false },
      { id: '5', title: 'Task 2', isDone: false },
      { id: '6', title: 'Task 3', isDone: false },
      { id: '7', title: 'Task 3', isDone: false },
      { id: '8', title: 'Task 3', isDone: false },
      { id: '9', title: 'Task 3', isDone: false },
      { id: '10', title: 'Task 3', isDone: false },
      { id: '11', title: 'Task 3', isDone: false },
      { id: '12', title: 'Task 3', isDone: false },
      { id: '13', title: 'Task 3', isDone: false },
      { id: '14', title: 'Task 3', isDone: false },
      { id: '15', title: 'Task 3', isDone: false },
      { id: '16', title: 'Task 3', isDone: false },
    ],
  );

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef<HTMLInputElement>(null);
  console.log('newTaskInputRef:', newTaskInputRef);

  // Удалить одну задачу (мемонизированно)
  const deleteTask = useCallback(
    (taskId: string) => {
      console.log(`Удаляем задачу с id: ${taskId}`);

      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks],
  );

  // Здача выбрана (checkbox) (мемонизированно)
  const toggleTaskComplete = useCallback(
    (taskId: string, isDone: boolean) => {
      console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`);

      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone };
          }

          return task;
        }),
      );
    },
    [tasks],
  );

  // Добавление задачи
  const addTask = useCallback(() => {
    console.log('Добавление новой задачи');

    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now.toString(), // уникальный id
        title: newTaskTitle,
        isDone: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
      setSearchQuery(''); // сбрасываем поиск
      if (newTaskInputRef.current) {
        newTaskInputRef.current.focus();
      }
    }
  }, [newTaskTitle]);

  // --------- --------- Подгрузка задач --------- ---------
  // Определяет, сколько блоков задач мы уже показали
  const [current, setCurrent] = useState<number>(1); // номер страницы

  // Сколько задач показываем за одну "страницу"
  const TASKS_PER_PAGE = 10;

  // Формируем массив задач для отображения
  // Берём с начала списка до (current * 10)
  // Если current = 1 → показываем 10 задач
  // Если current = 2 → показываем 20 задач
  // (мемонизированно)
  const tasksToShow: Task[] = useMemo(
    () => tasks.slice(0, current * TASKS_PER_PAGE),
    [tasks, current],
  );

  // Обработчик прокрутки страницы
  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Проверяем, насколько пользователь близко к низу страницы
    // scrollHeight — общая высота документа
    // scrollTop — сколько уже проскроллили
    // window.innerHeight — высота видимой области
    // Если до низа осталось меньше 100px → срабатываем
    if (scrollHeight - (scrollTop + windowHeight) < 100) {
      console.log('1111');
      // Проверяем, есть ли ещё задачи для показа
      if (tasksToShow.length < tasks.length) {
        console.log('222');
        // Увеличиваем номер страницы — это вызовет перерендер
        setCurrent((prev: number) => prev + 1);
      }
    }
  };

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Хук жизненного цикла
  useEffect(() => {
    // Добавляем обработчик прокрутки
    document.addEventListener('scroll', scrollHandler);

    // Очистка. Функция очистки (вызывается при размонтировании
    // или перед повторным выполнением эффекта)
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };

    // Эффект будет пересоздаваться каждый раз,
    // когда изменится tasksToShow (то есть при подгрузке новых задач)
  }, [tasksToShow]);

  useEffect(() => {
    if (newTaskInputRef.current) {
      newTaskInputRef.current.focus();
    }
  }, []);

  // Счетчике рендеров
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
    console.log(`Компонент отрендерился ${renderCount.current} раза`);
  }); // без второго аргумента будет срабатывать после каждого рендера. А с пустым массивом только один раз.

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    setTasks,
    tasksToShow,
    filteredTasks,
    addTask,
    newTaskInputRef,
    newTaskTitle,
    setNewTaskTitle,
    deleteTask,
    toggleTaskComplete,
    searchQuery,
    setSearchQuery,
  };
};

export default useTasks;
