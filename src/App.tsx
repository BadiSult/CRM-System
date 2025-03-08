 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './component/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './component/AuthContext/AuthContext';
import { RegisterPage } from './pages/RegisterPage';
import { Profil } from './pages/Profil';
import { useAuth } from './component/AuthContext/AuthContext';
import ErrorBoundary from './component/ErrorBoundary';
import { Layout, Button } from 'antd';
import { AuthLayout } from './component/Layout/AuthLayout';

const { Sider, Content } = Layout;

const Sidebar = () => {
  const { user, logout } = useAuth();
  return (
    <Sider style={{ padding: '20px', background: '#001529', color: 'white' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/todo" style={{ color: 'white' }}>Список задач</Link></li>
          <li><Link to="/profil" style={{ color: 'white' }}>Личный Кабинет</Link></li>
          {user ? (
            <Button
              style={{ backgroundColor: "rgb(155, 155, 252)", color: 'white', marginTop: '10px' }}
              onClick={logout}
            >
              Выйти
            </Button>
          ) : (
            <li><Link to="/login" style={{ color: 'white' }}>Вход</Link></li>
          )}
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
           
          <Routes>
            {/* Открытые страницы (без авторизации) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Защищённые страницы (требуют авторизации) */}
            <Route element={<ProtectedRoute />}>
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
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;