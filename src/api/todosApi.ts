import { Todo, TodoInfo, MetaResponse, TodoRequest } from '../component/types';

const API_BASE_URL = 'https://easydev.club/api/v1/todos';
type FilterType = 'all' | 'completed' | 'inWork'

// Получение списка задач с фильтром
export const fetchTodos = async (filter: FilterType): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await fetch(`${API_BASE_URL}?filter=${filter}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

// Добавление новой задачи
export const addTodo = async (title: string): Promise<void> => {
    const titleRequest:TodoRequest = {title}
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(titleRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
};

 
export const toggleTodos = async(todo:Todo):Promise<void> =>{
  const taskRequest:TodoRequest = {isDone: !todo.isDone}
  await fetch( `${API_BASE_URL}/${todo.id}`, {
    method: 'PUT',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(taskRequest)
  });
}

export const deleteTask = async(todo:Todo):Promise<void>=>{
  await fetch(`${API_BASE_URL}/${todo.id}`,{
    method:'DELETE',
})
}