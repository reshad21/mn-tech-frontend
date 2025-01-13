import { Layout, Menu, MenuProps, theme } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes"; // Import admin paths
import { userPaths } from "../../routes/user.routes"; // Import user paths

const { Header, Content, Sider } = Layout;

// Header menu items
const headerMenuItems: MenuProps["items"] = [
  { key: "/", label: "Payguard" },
  { key: "/item2", label: "Item 2" },
  { key: "/item3", label: "Item 3" },
];

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user); // Get user role from Redux
  const role = user?.role;

  // Determine sidebar items based on role
  const sidebarMenuItems: MenuProps["items"] =
    role === "admin"
      ? adminPaths.map(({ path, label }) => ({ key: path, label }))
      : userPaths.map(({ path, label }) => ({ key: path, label }));

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key); // Navigate to the route corresponding to the key
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* Header */}
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          items={headerMenuItems}
          onClick={handleMenuClick}
          style={{ flex: 1 }}
        />
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            items={sidebarMenuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
