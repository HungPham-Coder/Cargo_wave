"use client";

import React, { useEffect, useState } from "react";
import { Button, Flex, Layout, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import ProfileBar from "./profile";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import routes from "../router/routes";
import { usePathname } from "next/navigation";
import { useAuth } from "../mocks/auth";

const AppHeader: React.FC = () => {
  const [current, setCurrent] = useState<string>("home");
  const isAuthenticated = useAuth();
  const pathname = usePathname();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const items = [
    // {
    //   label: <Link href={routes.root}>Home</Link>,
    //   key: "home",
    // },
    // {
    //   label: <Link href={routes.route}>Route</Link>,
    //   key: "routes",
    // },
    // {
    //   label: <Link href={routes.about}>About</Link>,
    //   key: "about",
    // },
    {
      label: <Link href={routes.userManagement}>User management</Link>,
      key: "userManagement",
    },
    {
      label: <Link href={routes.roleManagement}>Role management</Link>,
      key: "roleManagement",
    },
    {
      label: <Link href={routes.permissionManagement}>Permission management</Link>,
      key: "permissionManagement",
    },
  ];

  useEffect(() => {
    const path = pathname.substring(1) || "home";
    console.log(current);
    setCurrent(path);
  }, [pathname]);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Link href={routes.root}>
          <img
            src="/assets/CARGO WAVE.png"
            style={{
              marginLeft: 50,
              marginTop: 25,
              cursor: "pointer",
              height: 40,
            }}
            alt="Logo"
          />
        </Link>
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
          {isAuthenticated ? (
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
