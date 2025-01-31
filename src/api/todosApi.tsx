import { Todo, TodoInfo, MetaResponse, TodoRequest } from '../component/types';
import axios from 'axios';
const API_BASE_URL = 'https://easydev.club/api/v1/todos';

 
export const fetchTodos = async (filter: string): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await axios.get<MetaResponse<Todo,TodoInfo>>(`${API_BASE_URL}`,{
    params:{filter}
  });
  return response.data
};

 
export const addTodo = async (title: string): Promise<void> => {
  const titleRequest:TodoRequest = {title}
 await axios.post(API_BASE_URL, titleRequest )
};

 
export const toggleTodos = async (id: number, isDone: boolean): Promise<void> => {
 const toggleRequest: TodoRequest = {isDone:!isDone}
 
  await axios.put(`${API_BASE_URL}/${id}`, toggleRequest)
};

 
export const deleteTask = async (id: number): Promise<void> => {
 
  await axios.delete(`${API_BASE_URL}/${id}`)
};


export const saveTask = async( id:number, trim:TodoRequest ):Promise<void> =>{
 
        await axios.put(`${API_BASE_URL}/${id}`, trim)
}