import { Todo, TodoInfo, MetaResponse,TodoRequest    } from '../component/types';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
 
import { AuthData, UserRegistration } from '../component/typesAut';
const API_BASE_URL = 'https://easydev.club/api/v1';




class TokenService {
    accessToken: string | null; 
    refreshToken: string | null;

  constructor() {
    this.refreshToken = localStorage.getItem("refreshToken") || null;
    this.accessToken = localStorage.getItem("accessToken") || null;
  }

   
  getToken() {
  return this.accessToken || localStorage.getItem("accessToken");
}

   
  setToken(token:string) {
    this.accessToken = token;
    localStorage.setItem("accessToken", token);
    apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }
  
  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    apiInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }
     
    getRefreshToken(): string | null {
      return this.refreshToken;
    }

      
  setRefreshToken(token: string): void {
    this.refreshToken = token;
    localStorage.setItem("refreshToken", token);
  }

   
  clearToken() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete apiInstance.defaults.headers.Authorization;
  }
}

 
const tokenInstance = new TokenService();
export default tokenInstance;









 
export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: tokenInstance.getToken() ? `Bearer ${tokenInstance.getToken()}` : undefined
  },
});

 
apiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = tokenInstance.getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



apiInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response?.status === 401) {
       
      console.warn("⏳ Токен истёк, пробуем обновить...");

      try {
        const refreshToken =   tokenInstance.getRefreshToken();
        if (!refreshToken) {
          console.error("⛔ Нет refresh-токена, разлогиниваем...");
          tokenInstance.clearToken();
          window.location.href = "/login"; 
          return Promise.reject(error);
        }

         
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
        console.log("🔄 Новый токен:", accessToken);

         
        tokenInstance.setToken(accessToken);
        tokenInstance.setRefreshToken(newRefreshToken);


        apiInstance.defaults.headers.Authorization = `Bearer ${accessToken}`; 
         
        const newRequestConfig ={
          ...error.config,
          headers:{
            ...error.config.headers,
            Authorization: `Bearer ${tokenInstance.getToken()}`,
          }
         }

        return apiInstance(newRequestConfig);  
      } catch (refreshError) {
        console.error("❌ Ошибка обновления токена", refreshError);
        tokenInstance.clearToken();
        window.location.href = "/login";  
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);












export const setAuthToken = (token: string | null) => {
  if (token) {
    tokenInstance.setToken(token);
  } else {
    tokenInstance.clearToken();
  }
};




export const registerUser = async (userData: UserRegistration) => {
  try {
    const response = await apiInstance.post("/auth/signup", userData);
    return response.data;
  } catch (error: any) {
    console.error("Ошибка регистрации:", error.response?.data || error.message);
     
  }
};

export const loginUser = async (authData: AuthData) => {
  try {
     
    const { login, password } = authData;

    console.log("📤 Запрос отправлен:", { login, password });
    const response = await apiInstance.post("/auth/signin", { login, password },);

    const Token = response.data 

     
    console.log("📥 Получен ответ:",Token);

    return Token;  
  } catch (error: any) {
    console.error("Ошибка авторизации:", error.response?.data || error.message);
    throw error;
  }
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};
 
export const getProfile = async () => {
  console.log("📡 Отправка запроса на сервер...");
  console.log("🔍 Заголовки:", apiInstance.defaults.headers);
   
  
  try {
    const response  = await apiInstance.get("/user/profile");
     
    console.log("✅ Ответ от сервера:", response);
    return response;
  } catch (error) {
    console.error("❌ Ошибка при получении профиля:", error);
    throw error;
  }
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