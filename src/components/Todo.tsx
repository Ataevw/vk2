import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AddTaskForm from './AddTaskForm.js';
import SearchTaskForm from './SearchTaskForm.js';
import TodoInfo from './TodoInfo.js';
import TodoList from './TodoList.js';
import TodoModal from './TodoModal.js';
import Button from './Buttons.js';

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

const Todo = () => {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
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
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Модальное окно
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Модальное окно — cогласие на удаление
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const newTaskInputRef = useRef<HTMLInputElement>(null);
  console.log('newTaskInputRef:', newTaskInputRef);

  const firstIncompliteTaskRef = useRef<HTMLLIElement>(null);
  const firstIncompliteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  // Открытие модалки на удаление (мемонизированно)
  // useCallback — запоинаем функцию между рендерами (пока не изменились зависимости)
  const deleteAllTasks = useCallback(() => setIsDeleteModalOpen(true), []);

  // Удалить все задачи
  const confirmDeleteAll = () => {
    console.log('Удаляем все задачи');

    setTasks([]); // очистка задачь (удаление)
    setIsDeleteModalOpen(false); // закрытие модалки
  };

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
  const addTask = useCallback(
    () => () => {
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
    },
    [newTaskTitle],
  );

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
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Данные в LocalStorage можно хранить только как JSON
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

  const doneTasks = useMemo(
    () => tasks.filter(({ isDone }) => isDone).length,
    [tasks],
  );

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskInputRef={newTaskInputRef}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <div>
        <a
          href=""
          onClick={(e) => {
            (e.preventDefault(), setIsOpen(true));
          }}
        >
          Ссылка
        </a>
      </div>
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo
        total={tasks.length}
        done={doneTasks}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() =>
          firstIncompliteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        Показать первую не выбранную
      </Button>
      <TodoList
        tasksToShow={tasksToShow}
        filteredTasks={filteredTasks}
        firstIncompliteTaskRef={firstIncompliteTaskRef}
        firstIncompliteTaskId={firstIncompliteTaskId}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />

      {/* Модалки */}
      <TodoModal isOpen={isOpen} setIsOpen={setIsOpen}>
        Модалка обычная
      </TodoModal>
      <TodoModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onConfirm={confirmDeleteAll}
      >
        Точно вы хотите удалить задачу?
      </TodoModal>
    </div>
  );
};

export default Todo;
