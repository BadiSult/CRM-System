import { Todo, TodoInfo, MetaResponse, TodoRequest, UserRegistration, AuthData  } from '../component/types';
import axios from 'axios';
 
const API_BASE_URL = 'https://easydev.club/api/v1';

 
export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Токен истёк, пробуем обновить...");

      try {
        const refreshToken = localStorage.getItem("refresh"); // Берем refresh-токен
        if (!refreshToken) throw new Error("Отсутствует refresh-токен");

        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { access, refresh } = refreshResponse.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        // Повторяем исходный запрос с новым токеном
        error.config.headers.Authorization = `Bearer ${access}`;
        return apiInstance(error.config);
      } catch (refreshError) {
        console.error("Ошибка обновления токена", refreshError);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; // Перенаправляем на страницу входа
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("accessToken", token);
  } else {
    delete apiInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("accessToken");
  }
};

export const registerUser = async (userData: UserRegistration) => {
  try {
    const response = await apiInstance.post("/auth/signup", userData);
    return response.data;
  } catch (error: any) {
    console.error("Ошибка регистрации:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Ошибка регистрации");
  }
};

export const loginUser = async (authData: AuthData) => {
  try {
     
    const { login, password } = authData;

    
    const response = await apiInstance.post("/auth/signin", { login, password });

    console.log("📤 Запрос отправлен:", { login, password });
    console.log("📥 Получен ответ:", response.data);

    return response.data;  
  } catch (error: any) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw error;
  }
};


export const getProfile = async () => {
  const response = await apiInstance.get("/user/profile");
  return response.data;
};

export const logoutUser = () => {
  setAuthToken(null);
};









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