export interface UserRegistration { 
    login: string; 
    username: string; 
    password: string; 
    email: string; 
    phoneNumber: string; 
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
    roles: Role[];
    phoneNumber: string; 
  }
  
  export type ProfileRequest = Pick<Profile, 'username' | 'email' | 'phoneNumber'>;
  
  export interface PasswordRequest { 
    password: string; 
  }
  
  export interface Token {
   access: string
   refresh: string
  
  }

  type Role = 'ADMIN' | 'USER' | 'MODERATOR'