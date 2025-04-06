import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  console.log(isAuth);
  
  if (isLoading) return <div>Загрузка...</div>;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};