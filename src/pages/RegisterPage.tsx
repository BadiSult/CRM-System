import { Form, Input, Button, message } from "antd";
import { registerUser } from "../api/todosApi";
import { UserRegistration } from "../component/typesAut";
import { Link } from "react-router-dom";
import { useState } from "react";

export const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onFinish = async (values: UserRegistration & { confirmPassword: string }) => {
    try {
      const { confirmPassword, ...userData } = values;

      if (userData.password !== confirmPassword) {
        message.error("Пароли не совпадают");
        return;
      }

      await registerUser(userData);
      setSuccessMessage("Успешно зарегистрировано!");
      form.resetFields();
    } catch (err: any) {
      message.error(err?.message || "Ошибка регистрации");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ fontSize: "32px", textAlign: "center" }}>Регистрация</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Логин"
          name="login"
          rules={[
            { required: true, message: "Введите логин" },
            { min: 2, max: 60, message: "Логин от 2 до 60 символов" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Введите email" },
            { type: "email", message: "Введите корректный email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="phoneNumber"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: "Введите пароль" },
            { min: 6, max: 60, message: "Пароль от 6 до 60 символов" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Повторите пароль"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Подтвердите пароль" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              backgroundColor: "#7F265B",
              borderColor: "#7F265B",
            }}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>

      {successMessage && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>{successMessage}</p>
          <Link to="/login">Перейти на страницу авторизации</Link>
        </div>
      )}
    </div>
  );
};