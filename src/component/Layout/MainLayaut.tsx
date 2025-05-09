import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";

const { Content } = Layout;

export const MainLayaut: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <Content style={{ padding: "20px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
 
