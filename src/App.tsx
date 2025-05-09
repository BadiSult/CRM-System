 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TodoListPage } from "./pages/TodoListPage";
import { Profil } from "./pages/Profil";
import { PrivateRoute } from "./component/ProtectedRoute/ProtectedRoute";
import { AuthLayout } from "./component/Layout/AuthLayout";
import { MainLayaut } from "../src/component/Layout/MainLayaut";
import { Navigate } from "react-router-dom"; // не забудь импортировать!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Редирект с корня */}
        <Route path="/" element={<Navigate to="/todo" />} />

        {/* Открытая часть */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Защищённая часть */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayaut />}>
            <Route path="/todo" element={<TodoListPage />} />
            <Route path="/profil" element={<Profil />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App