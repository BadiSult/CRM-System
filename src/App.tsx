import React, { useEffect, useState } from 'react';

// Интерфейсы
interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

// Приложение
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функция загрузки задач с сервера
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://easydev.club/api/v1/todos');
      const result: MetaResponse<Todo, TodoInfo> = await response.json();
      setTodos(result.data);
      setInfo(result.info || null);
    } catch (err) {
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  // Функция изменения статуса задачи
  const toggleTodoStatus = async (id: Todo['id'], isDone: boolean) => {
    try {
      const request: TodoRequest = { isDone };
      await fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      // Обновляем локальное состояние после успешного запроса
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isDone } : todo
        )
      );
    } catch {
      setError('Ошибка изменения статуса задачи');
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchTodos();
  }, []);

  // Отображение задач
  return (
    <div>
      <h1>Список задач</h1>

      {/* Загрузка и ошибки */}
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Статистика */}
      {info && (
        <div>
          <p>Всего задач: {info.all}</p>
          <p>Выполнено: {info.completed}</p>
          <p>В работе: {info.inWork}</p>
        </div>
      )}

      {/* Список задач */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isDone ? 'line-through' : 'none',
              }}
            >
              {todo.title} ({new Date(todo.created).toLocaleDateString()})
            </span>
            <button onClick={() => toggleTodoStatus(todo.id, !todo.isDone)}>
              {todo.isDone ? 'Отменить' : 'Выполнено'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

 














 
