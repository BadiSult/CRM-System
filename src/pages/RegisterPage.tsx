import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/todosApi"; 
import { UserRegistration } from "../component/types";  

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
   
  const [form, setForm] = useState<UserRegistration>({
    login: "",
    username: "",
    password: "",
    confirmPassword:"",
    email: "",
    phoneNumber: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");  
  const [error, setError] = useState<string | null>(null);

   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   
  const validateForm = () => {
    if (!form.login || !form.username || !form.password || !form.email) {
      setError("Заполните все обязательные поля.");
      return false;
    }
    if (form.login.length < 2 || form.login.length > 60) {
      setError("Логин должен содержать от 2 до 60 символов.");
      return false;
    }
    if (form.password.length < 6 || form.password.length > 60) {
      setError("Пароль должен содержать от 6 до 60 символов.");
      return false;
    }
    if (form.password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Введите корректный email.");
      return false;
    }
   
    setError(null);
    return true;
  };

   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(form);
      alert("Регистрация успешна!");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации.");
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <input
  type="text"
  name="username"
  placeholder="Имя пользователя"
  value={form.username}
  onChange={handleChange}
  autoComplete="name"  
/>
<input
  type="text"
  name="login"
  placeholder="Логин"
  value={form.login}
  onChange={handleChange}
  autoComplete="username"
/>
<input
  type="email"
  name="email"
  placeholder="Email"
  value={form.email}
  onChange={handleChange}
  autoComplete="email"
/>
<input
  type="password"
  name="password"
  placeholder="Пароль"
  value={form.password}
  onChange={handleChange}
  autoComplete="new-password"  
/>
<input
  type="password"
  name="confirmPassword"
  placeholder="Повторите пароль"
  value={form.confirmPassword}
  onChange={handleChange}
  autoComplete="new-password"
/>
<input
  type="tel"
  name="phoneNumber"
  placeholder="Телефон"
  value={form.phoneNumber}
  onChange={handleChange}
  autoComplete="tel"  
/>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

 