import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  console.log("Проверяем доступ, текущий user:", user);
  if (isLoading) return <div>Загрузка...</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};