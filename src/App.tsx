 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './component/ProtectedRoute/ProtectedRoute';
import { AuthProvider, useAuth } from './component/AuthContext/AuthContext';
import { RegisterPage } from './pages/RegisterPage';
import { Profil } from './pages/Profil';
 
import ErrorBoundary from './component/ErrorBoundary';
import { Layout, Button } from 'antd';

const {Sider, Content } = Layout;

const Sidebar = () => {
  const { user, logout } = useAuth();
  console.log("App рендерится, user:", user);
  return (
    <Sider>
      <nav>
        <ul>
          <li><Link to="/todo">Список задач</Link></li>
          <li><Link to="/profil">Личный Кабинет</Link></li>
          {!user && <li><Link to="/register">Регистрация</Link></li>}
          {!user ? <li><Link to="/login">Вход</Link></li> : <Button style={{backgroundColor:" rgb(155, 155, 252)", color:'white', marginTop:'10px'}} onClick={logout}>Выйти</Button>}
        </ul>
      </nav>
    </Sider>
  );
};

const App: React.FC = () => {
 
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Content>
              <Routes>
                {/* Открытые маршруты */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Защищённые маршруты вынесены ЗА пределы RegisterPage */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/todo" element={<TodoListPage />} />
                  <Route path="/profil" element={<Profil />} />
                </Route>
              </Routes>
            </Content>
          </Layout>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;