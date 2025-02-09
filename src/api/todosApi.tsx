import { Todo, TodoInfo, MetaResponse, TodoRequest } from '../component/types';
import axios from 'axios';
// const API_BASE_URL = 'https://easydev.club/api/v1/todos';
const API_BASE_URL = 'https://easydev.club/api/v1';

 
export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodos = async (filter: string): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await apiInstance.get<MetaResponse<Todo,TodoInfo>>(`/todos`,{
    params:{filter},
  });
  return response.data
};

 
export const addTodo = async (title: string): Promise<void> => {
  const titleRequest:TodoRequest = {title}
 await apiInstance.post( '/todos', titleRequest )
};

 
export const toggleTodos = async (id: number, isDone: boolean): Promise<void> => {
 const toggleRequest: TodoRequest = {isDone:!isDone}
 
  await  apiInstance.put(`/todos/${id}`, toggleRequest)
};

 
export const deleteTask = async (id: number): Promise<void> => {
 
  await apiInstance.delete(`/todos/${id}`)
};


export const saveTask = async( id:number, trim:TodoRequest ):Promise<void> =>{
 
        await apiInstance.put(`/todos/${id}`, trim)
}