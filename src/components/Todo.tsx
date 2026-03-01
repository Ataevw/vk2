import { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm.js';
import SearchTaskForm from './SearchTaskForm.js';
import TodoInfo from './TodoInfo.js';
import TodoList from './TodoList.js';
import TodoModal from './TodoModal.js';

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

const Todo = () => {
  // Список задач с типом Task[]
  const taskList: Task[] = [
    { id: '1', title: 'Task 1', isDone: true },
    { id: '2', title: 'Task 2', isDone: true },
    { id: '3', title: 'Task 3', isDone: true },
    { id: '4', title: 'Task 1', isDone: true },
    { id: '5', title: 'Task 2', isDone: true },
    { id: '6', title: 'Task 3', isDone: true },
    { id: '7', title: 'Task 3', isDone: false },
    { id: '8', title: 'Task 3', isDone: true },
    { id: '9', title: 'Task 3', isDone: true },
    { id: '10', title: 'Task 3', isDone: true },
    { id: '11', title: 'Task 3', isDone: true },
    { id: '12', title: 'Task 3', isDone: true },
    { id: '13', title: 'Task 3', isDone: false },
    { id: '14', title: 'Task 3', isDone: true },
    { id: '15', title: 'Task 3', isDone: true },
    { id: '16', title: 'Task 3', isDone: true },
  ];

  // Удалить все задачи
  const deleteAllTasks = () => {
    console.log('Удаляем все задачи');
  };

  // Удалить одну задачу
  const deleteTask = (taskId: string) => {
    console.log(`Удаляем задачу с id: ${taskId}`);
  };

  // Здача выбрана (checkbox)
  const toggleTaskComplete = (taskId: string, isDone: boolean) => {
    console.log(`Задача ${taskId} ${isDone ? 'выполнена' : 'не выполнена'}`);
  };

  // Поиск
  const filterTasks = (query: string) => {
    console.log(`Поиск: ${query}`);
  };

  // Добавление задачи
  const addTask = () => {
    console.log('Добавление новой задачи');
  };

  // Модальное окно
  const openModal = () => {
    console.log(`Открываем модальное окно`);
  };

  // --------- --------- Подгрузка задач --------- ---------
  // Определяет, сколько блоков задач мы уже показали
  const [current, setCurrent] = useState<number>(1); // номер страницы

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
      <AddTaskForm addTask={addTask} />
      <TodoModal onOpenModal={openModal} />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        total={taskList.length}
        done={taskList.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasksToShow={tasksToShow}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;
