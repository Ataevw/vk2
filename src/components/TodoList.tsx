import { useEffect, useState } from 'react';
import TodoItem from './TodoItem.js';

// Интерфейс для задачи
interface Task {
  title: string;
}

const TodoList = () => {
  const hasTasks: boolean = true;

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

  if (!hasTasks) {
    return <div className="todo__empty-message"></div>;
  }

  return (
    <ul className="todo__list">
      {tasksToShow.map((task, index) => (
        <TodoItem task={task} key={`${task.title}-${index}`} />
      ))}
    </ul>
  );
};

export default TodoList;
