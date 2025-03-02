import { useState } from "react";
import { useAuth } from "../component/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.login || !form.password) {
      alert("Заполните все поля!");
      return;
    }
    console.log("Отправляемые данные:", {
      login: form.login,
      password: form.password,
    });
  
    try {
      
      await login(form.login, form.password);
      
      console.log("✅ Успешный вход:");
  
      navigate("/todo");  
    } catch (error: any) {
      console.error("❌ Ошибка входа:", error.response?.data || error.message);
      
      if (error.response) {
        console.log("Ответ от сервера:", error.response);
      }

      
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
  type="text"
  name="login"
  placeholder="Логин"
  value={form.login}
  onChange={handleChange}
  autoComplete="username"  
/>
<input
  type="password"
  name="password"
  placeholder="Пароль"
  value={form.password}
  onChange={handleChange}
  autoComplete="current-password"  
/>
      <button type="submit">Войти</button>
    </form>
  );
};