export interface TodoRequest {
    title?: string;
    isDone?: boolean;
  }

export interface Todo {
    id: number;
    title: string;
    created: string; // ISO date string
    isDone: boolean;
  }

export interface TodoInfo {
    all: number;
    completed: number;
    inWork: number;
  }

export  interface MetaResponse<T, N> {
    data: T[];
    info?: N;
    meta: {
      totalAmount: number;
    };
  }

 export type FilterType = 'all' | 'completed' | 'inWork'

 export interface UserRegistration { 
  login: string; 
  username: string; 
  password: string; 
  confirmPassword?: string;
  email: string; 
  phoneNumber?: string; 
}

export interface AuthData { 
  login: string; 
  password: string; 
}

export interface RefreshToken { 
  refreshToken: string; 
}

export interface Profile { 
  id: number; 
  username: string; 
  email: string; 
  date: string; 
  isBlocked: boolean; 
  isAdmin: boolean; 
  phoneNumber: string; 
}

export interface ProfileRequest { 
  username: string; 
  email: string; 
  phoneNumber: string; 
}

export interface PasswordRequest { 
  password: string; 
}

export interface Token {
 access: string
 refresh: string

}