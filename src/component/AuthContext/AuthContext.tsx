import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, getProfile, logoutUser, setAuthToken } from "../../api/todosApi";
import { apiInstance } from "../../api/todosApi";

interface User {
  id: number;
  username: string;
  email: string;
  token?: string; // Сделать token необязательным
}

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      setAuthToken(token);  

      try {
        const profile = await getProfile();
        setUser({
          id: profile.id,
          username: profile.username,
          email: profile.email,
          token,
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

    fetchUser();
  }, [setAuthToken]);

  const login = async (login: string, password: string) => {
    try {
      const response = await loginUser({ login, password });
      console.log("Ответ от сервера:", response);
      if (!response || !response.accessToken) {
        throw new Error("Некорректный ответ от сервера");
      }
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      const profileResponse = await apiInstance.get("/user/profile", {
        headers: { Authorization: `Bearer ${response.accessToken}` },
      });

      const userData = profileResponse.data;

      setUser({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: response.accessToken,
      });

      console.log("✅ Пользователь сохранён:", {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: response.accessToken,
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