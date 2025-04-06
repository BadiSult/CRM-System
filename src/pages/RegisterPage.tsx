import React, { useState } from "react";
 
import { registerUser } from "../api/todosApi"; 
import { UserRegistration } from "../component/typesAut";  
import { Link } from "react-router-dom";
export const RegisterPage: React.FC = () => {
   
  
   
  const [form, setForm] = useState<UserRegistration>({
    login: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");  
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
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
    setError(null)
    setSuccessMessage(null)
    if (!validateForm()) return;

    try {
      await registerUser(form);
       setSuccessMessage("перейти на страницу авторизации для входа в систему")
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации.");
    }
  };

  return (
    <div>
      <h2 style={{fontSize:"36px"}}>Регистрация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <input
       style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px",marginTop:"20px" }}

  type="text"
  name="username"
  placeholder="Имя пользователя"
  value={form.username}
  onChange={handleChange}
  autoComplete="name"  
/>
<input
 style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px",marginTop:"20px" }}
  type="text"
  name="login"
  placeholder="Логин"
  value={form.login}
  onChange={handleChange}
  autoComplete="username"
/>
<input
 style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px",marginTop:"20px" }}
  type="email"
  name="email"
  placeholder="Email"
  value={form.email}
  onChange={handleChange}
  autoComplete="email"
/>
<input
 style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px",marginTop:"20px" }}
  type="password"
  name="password"
  placeholder="Пароль"
  value={form.password}
  onChange={handleChange}
  autoComplete="new-password"  
/>
<input
 style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px",marginTop:"20px" }}
  type="password"
  name="confirmPassword"
  placeholder="Повторите пароль"
  value={confirmPassword}
  onChange={handleConfirmPasswordChange}
  autoComplete="new-password"
/>
<input
 style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px",marginTop:"20px" }}
  type="tel"
  name="phoneNumber"
  placeholder="Телефон"
  value={form.phoneNumber}
  onChange={handleChange}
  autoComplete="tel"  
/>
        <button type="submit"  style={{marginTop:"60px", width:"420px", height:"50px", backgroundColor:"#7F265B",color:"white", borderRadius: "7px", border: "0px solid #7F265B",transition: "all 0.3s ease",  }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgb(238, 148, 201)";
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#7F265B";
          e.currentTarget.style.color = "white";
        }}
        >Зарегистрироваться</button>
      </form>
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          <Link to="/login"> страница авторизации</Link>
        </div>
      )}
    </div>
  );
};

 