import { Todo, TodoInfo, MetaResponse, TodoRequest } from '../component/types';

const API_BASE_URL = 'https://easydev.club/api/v1/todos';

 
export const fetchTodos = async (filter: string): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await fetch(`${API_BASE_URL}?filter=${filter}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

 
export const addTodo = async (title: string): Promise<void> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title } as TodoRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
};

 
export const toggleTodos = async (id: number, todo: TodoRequest): Promise<void> => {
 const toggleRequest: TodoRequest = {isDone:!todo.isDone}
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toggleRequest),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
};

 
export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};


export const saveTask = async( id:number, trim:TodoRequest ):Promise<void> =>{

   
        await fetch(`https://easydev.club/api/v1/todos/${id}`,{
          method: 'PUT',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(trim )
        });
}