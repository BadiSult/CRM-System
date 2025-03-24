import { createContext, useContext, useEffect, useState } from "react";
import tokenInstance, { loginUser, getProfile, logoutUser, setAuthToken } from "../../api/todosApi";
import { apiInstance } from "../../api/todosApi";
import { useNavigate } from 'react-router-dom';
import { Profile, AuthData } from "../types";

 

interface AuthContextType {
  user: Profile | null;
  login: (user:AuthData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
   
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let accessToken = null
  
  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    setAuthToken(token);  

    try {
      const response = await getProfile();
      const profile = response.data
      setUser({
        id: profile.id,
        username: profile.username,
        email: profile.email,
         date: profile.date,
         isAdmin: profile.isAdmin,
         isBlocked: profile.isBlocked,
         phoneNumber: profile.phoneNumber
      });
      console.log("✅ Пользователь загружен:", profile);
    } catch (err) {
      console.error("❌ Ошибка при получении профиля:", err);
      setError("Ошибка при получении профиля. Попробуйте снова.");
      logout();  
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
     

    fetchUser();
  }, []);







  const login = async ( userDatas: AuthData) => {
    try {
      const response = await loginUser(userDatas);
      console.log("Ответ от сервера 1:", response);
      if (!response || !response.accessToken) {
        throw new Error("Некорректный ответ от сервера");
      }
      tokenInstance.setToken(response.accessToken);
      tokenInstance.setRefreshToken(response.refreshToken);
      console.log("time token", response.accessToken.exp);
      
      apiInstance.defaults.headers.Authorization = `Bearer ${response.accessToken}`;
       

      const profileResponse = await getProfile()

      const userData = profileResponse.data;

      setUser({
        date:userData.date,
        email: userData.email,
        id: userData.id,
        isAdmin: userData.isAdmin,
        isBlocked:userData.isBlocked,
        phoneNumber:userData.phoneNumber,
        username: userData.username,

      });

      console.log("✅ Пользователь сохранён:", {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        isAdmin: userData.isAdmin,
        isBlocked:userData.isBlocked,
        date:userData.date,
        phoneNumber:userData.phoneNumber
      });
    } catch (err) {
      setError("Ошибка при входе. Проверьте свои данные.");
      throw err;
    }
  };








  const logout = () => {
    logoutUser();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};