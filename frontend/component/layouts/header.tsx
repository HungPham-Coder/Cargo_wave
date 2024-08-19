"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Layout, Menu, MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import ProfileBar from "./profile";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import routes from "../router/routes";
import AppFooter from "./footer";

const contentLayout: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  backgroundColor: "#FFFFFF",
  minHeight: "82vh",
};

const AppHeader: React.FC = () => {
  // const router = useRouter();
  const [current, setCurrent] = useState<string>("home");
  const [isLoggedIn] = useState<boolean>(false);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const [route, setRoute] = useState(router.pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const handleLogoClick = () => {
    // navigate("/");
    setCurrent("home");
  };

  const items = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Route",
      key: "routes",
    },
    {
      label: "About",
      key: "about",
    },
  ];

  useEffect(() => {
    const path = location.pathname.substring(1) || "home";
    console.log(current)
    setCurrent(path);
  }, [location.pathname]);

  return (
    <Layout style={{ marginBottom: 20 }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          backgroundColor: "#F5F5F5",
        }}
      >
        <div>
          <img
            src="/assets/CARGO WAVE.png"
            style={{
              marginLeft: 50,
              marginTop: 25,
              cursor: "pointer",
              height: 40,
            }}
            alt="Logo"
            onClick={handleLogoClick}
          />
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{
            flex: 4,
            justifyContent: "center",
            display: "flex",
            fontSize: 20,
            backgroundColor: "#F5F5F5",
          }}
        />
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          {isLoggedIn ? (
            <ProfileBar />
          ) : (
            <Flex gap="small">
              {/* <Tooltip title="search">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                />
              </Tooltip> */}
              <Button
                type="default"
                icon={<LoginOutlined />}
                style={{ fontSize: "18px", backgroundColor: "white" }}
              >
                <Link href={routes.login}>Login</Link>
              </Button>
            </Flex>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
