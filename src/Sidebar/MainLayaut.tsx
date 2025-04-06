import { Button, Layout } from "antd";
 
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import { TodoListPage } from "../pages/TodoListPage";
import { Profil } from "../pages/Profil";
import { PrivateRoute } from "../component/ProtectedRoute/ProtectedRoute";  
import { AuthLayout } from "../component/Layout/AuthLayout";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/authSlice";





 const { Sider, Content } = Layout;
 
  const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
     
  return (
    <Sider style={{ padding: '20px', background: '#001529', color: 'white' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/todo" style={{ color: 'white' }}>Список задач</Link></li>
          <li><Link to="/profil" style={{ color: 'white' }}>Личный Кабинет</Link></li>
          
            <Button
              style={{ backgroundColor: "rgb(155, 155, 252)", color: 'white', marginTop: '10px' }}
              onClick={()=>dispatch(logout())}
            >
              Выйти
            </Button>
           
        </ul>
      </nav>
    </Sider>
  );

  
};
export const MainLayaut: React.FC = () => {
    return(
      <BrowserRouter>
           
      <Routes>
        {/* Открытые страницы (без авторизации) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Защищённые страницы (требуют авторизации) */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <Layout style={{ minHeight: '100vh', display: 'flex' }}>
                <Sidebar />
                <Content style={{ padding: '20px' }}>
                  <Routes>
                    <Route path="/todo" element={<TodoListPage />} />
                    <Route path="/profil" element={<Profil />} />
                  </Routes>
                </Content>
              </Layout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    )
    
}