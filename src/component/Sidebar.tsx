import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";

const { Sider } = Layout;

export const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Sider style={{ padding: "20px", background: "#001529", color: "white" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/todo" style={{ color: "white" }}>
            Список задач
          </Link>
        </li>
        <li>
          <Link to="/profil" style={{ color: "white" }}>
            Личный Кабинет
          </Link>
        </li>
        <Button
          style={{
            backgroundColor: "rgb(155, 155, 252)",
            color: "white",
            marginTop: "10px",
          }}
          onClick={() => dispatch(logout())}
        >
          Выйти
        </Button>
      </ul>
    </Sider>
  );
};