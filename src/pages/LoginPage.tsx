import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import header from "../assets/header.png";
 

import { Form, Input, Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../store/authSlice";

const { Title, Text } = Typography;

export const LoginPage = () => {
  
  const [form] = Form.useForm();   

  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuth) navigate("/todo");  
  }, [isAuth]);

  const handleSubmit = async (values: { login: string; password: string }) => {
    await dispatch(login(values));
  };
   

  return (
    <div style={{ marginBottom: "200px", textAlign: "center" }}>
      <img
        src={header}
        style={{ width: "72px", height: "72px", marginBottom: "35px" }}
        alt="Logo"
      />

      <div style={{ width: "420px", margin: "0 auto", textAlign: "left" }}>
        <Title level={2}>Login to your Account</Title>
        <Text type="secondary">See what is going on with your business</Text>

        <Form
          form={form}  
          layout="vertical"
          onFinish={handleSubmit}  
          style={{ marginTop: "35px" }}
        >
          <Form.Item 
            label="Login" 
            name="login"  
            rules={[{ required: true, message: "Please enter your login!" }]}
          > 
            <Input placeholder="Логин" />
          </Form.Item>

          <Form.Item 
            label="Password" 
            name="password"  
            rules={[{ required: true, message: "Please enter your password!" }]}
          > 
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary"
              htmlType="submit"
              block  
              style={{ backgroundColor: "#7F265B", borderColor: "#7F265B" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgb(238, 148, 201)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7F265B")}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ marginTop: "20px", display: "block", textAlign: "center" }}>
          Not Registered Yet? <Link to="/register" style={{ color: "#7F265B" }}>Create an account</Link>
        </Text>
      </div>
    </div>
  );
};