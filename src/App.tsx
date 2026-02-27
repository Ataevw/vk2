import { useEffect, useState } from 'react';
//import axios from 'axios';

// Интерфейс для задачи
interface Task {
  title: string;
}

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Определяет, сколько блоков задач мы уже показали
  const [current, setCurrent] = useState<number>(1); // номер страницы

  // Список задач с типом Task[]
  const taskList: Task[] = [
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
  ];

  // Сколько задач показываем за одну "страницу"
  const TASKS_PER_PAGE = 10;

  // Формируем массив задач для отображения
  // Берём с начала списка до (current * 10)
  // Если current = 1 → показываем 10 задач
  // Если current = 2 → показываем 20 задач
  const tasksToShow: Task[] = taskList.slice(0, current * TASKS_PER_PAGE);

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
      if (tasksToShow.length < taskList.length) {
        console.log('222');
        // Увеличиваем номер страницы — это вызовет перерендер
        setCurrent((prev: number) => prev + 1);
      }
    }
  };

  // Хук жизненного цикла
  useEffect(() => {
    // Добавляем обработчик прокрутки
    document.addEventListener('scroll', scrollHandler);

    // Функция очистки (вызывается при размонтировании
    // или перед повторным выполнением эффекта)
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };

    // Эффект будет пересоздаваться каждый раз,
    // когда изменится tasksToShow (то есть при подгрузке новых задач)
  }, [tasksToShow]);

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <form className="todo__form">
        <div className="todo__field field">
          <label className="field__label" htmlFor="new-task">
            New task
          </label>
          <input
            className="field__input"
            id="new-task"
            placeholder=" "
            autoComplete="off"
          />
        </div>
        <button className="button" type="submit">
          Add
        </button>
      </form>
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
      <form className="todo__form">
        <div className="todo__field field">
          <label className="field__label" htmlFor="search-task">
            Search task
          </label>
          <input
            className="field__input"
            id="search-task"
            placeholder=" "
            autoComplete="off"
            type="search"
          />
        </div>
      </form>
      <div className="todo__info">
        <div className="todo__total-tasks">
          Total tasks: <span>0</span>
        </div>
        <button className="todo__delete-all-button" type="button">
          Delete all
        </button>
      </div>
      <ul className="todo__list">
        {tasksToShow.map((task, index) => (
          <li className="todo__item todo-item" key={`${task}-${index}`}>
            <input
              className="todo-item__checkbox"
              id="task-1"
              type="checkbox"
              defaultChecked
            />
            <label className="todo-item__label" htmlFor="task-1">
              {task.title}
            </label>
            <button
              className="todo-item__delete-button"
              aria-label="Delete"
              title="Delete"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="#757575"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="todo__empty-message"></div>
    </div>
  );
};

export default App;
