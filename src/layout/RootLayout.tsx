import {
  HomeOutlined,
  HeartOutlined,
  HistoryOutlined,
  MessageOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography, Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import ChatbotModal from "../components/ChatbotModal";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  const items = [
    { label: "Trang chủ", icon: <HomeOutlined />, key: "/", path: "/" },
    {
      label: "Yêu thích",
      icon: <HeartOutlined />,
      key: "/favorite",
      path: "/favorite",
    },
    {
      label: "Lịch sử xem",
      icon: <HistoryOutlined />,
      key: "/history",
      path: "/history",
    },
  ];

  return (
    <Layout className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50 bg-[#001529] shadow-md p-0">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <Title level={3} className="!m-0">
              <Link
                to="/"
                className="!text-white font-bold no-underline hover:text-gray-200 transition"
              >
                EduShop
              </Link>
            </Title>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center ml-10 h-16">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              className="flex-1 bg-transparent border-none text-white edushop-menu"
            >
              {items.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  className="!text-white !border-b-2 !border-transparent hover:!border-gray-200 hover:!bg-white/10 !transition-all edushop-menu-item"
                >
                  <Link to={item.path} className="text-inherit no-underline">
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="!text-white text-2xl border-none bg-transparent hover:text-gray-200"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {collapsed && (
          <div className="md:hidden absolute left-0 right-0 bg-[#001529] shadow-lg animate-slideDown">
            <Menu
              theme="dark"
              mode="vertical"
              selectedKeys={[location.pathname]}
              className="bg-transparent border-none edushop-menu"
            >
              {items.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => setCollapsed(false)}
                  className="!text-white hover:!bg-white/10 !transition-all edushop-menu-item"
                >
                  <Link to={item.path} className="text-inherit no-underline">
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        )}
      </Header>

      <Content className="flex-1 bg-gray-100">
        <div className="max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </Content>

      <Footer className="!bg-[#001529] !text-white pt-12 pb-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">EduShop</h4>
            <p className="text-gray-300 text-sm">
              Nền tảng giáo dục trực tuyến hàng đầu
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <p className="text-gray-300 text-sm mb-1">
              Email: contact@edushop.com
            </p>
            <p className="text-gray-300 text-sm">Điện thoại: 0123 456 789</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Theo dõi</h4>
            <p className="text-gray-300 text-sm mb-1 cursor-pointer hover:text-white transition">
              Facebook
            </p>
            <p className="text-gray-300 text-sm cursor-pointer hover:text-white transition">
              Instagram
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center border-t border-gray-800 pt-4">
          <p className="text-gray-400 text-xs">
            EduShop©{new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </Footer>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined style={{ fontSize: 24 }} />}
          size="large"
          className="shadow-lg flex items-center justify-center !bg-orange-600 hover:!bg-orange-700 !transition-all"
          onClick={() => setChatOpen(true)}
          aria-label="Mở chatbot"
        />
      </div>
      <ChatbotModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </Layout>
  );
}
