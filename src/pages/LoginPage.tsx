import { useState } from "react";
import { useAuth } from "../component/AuthContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import header from "../assets/header.png"
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
    <div style={{marginBottom:"200px"}} >
      <img src={header} style={{width:"72px", height:"72px", marginBottom:"35px"}} alt="" />

      <div  style={{width:"420px", height:"376px", alignContent:"center"}}>

      <div style={{marginLeft:"25px"}}>
        <div style={{fontSize:"36px"}}>
        Login to your Account
        </div>
        <div style={{fontSize:"16px", marginTop:"5px"}}>
       See what is going on with your business
          </div> 
      </div>

      <div style={{marginTop:"35px"}}>
      <form onSubmit={handleSubmit}>
        <div>
          <p style={{marginBottom:"5px", fontSize:"12px", }}>Login</p>
        <input
      style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px",}}
       type="text"
       name="login"
       placeholder="  Логин"
       value={form.login}
       onChange={handleChange}
      autoComplete="username"  
      />
        </div>
      
      <div style={{marginTop:"25px"}}>
        <p style={{marginBottom:"5px", fontSize:"12px"}}>Password</p>
      <input
      style={{width:"420px", height:"45px",border: "1px solid #DED2D9", borderRadius: "7px", }}
        type="password"
        name="password"
        placeholder="  Пароль"
       value={form.password}
       onChange={handleChange}
       autoComplete="current-password"  
      />
      </div>
      
      <button  style={{marginTop:"60px", width:"420px", height:"50px", backgroundColor:"#7F265B",color:"white", borderRadius: "7px", border: "0px solid #7F265B",transition: "all 0.3s ease",  }} type="submit"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgb(238, 148, 201)";
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#7F265B";
        e.currentTarget.style.color = "white";
      }}
      >Login</button>
       <div style={{marginTop:"305px", marginLeft:"70px", color:"#828282"}}>Not Registered Yet?<Link style={{color:"#7F265B", fontSize:"18px"}} to="/register"> Create san account</Link></div> 
    </form>
      </div>
       
      </div>
       
    </div>
    
  );
};