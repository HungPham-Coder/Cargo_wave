"use client";

import React from "react";
import { Button, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import ProfileBar from "./profile";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import routes from "../router/routes";
import { useAuth } from "../mocks/auth";

const AppHeader: React.FC = () => {
  const isAuthenticated = useAuth(); // Get authentication status from custom hook

  console.log("isAuthenticated", isAuthenticated);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          backgroundColor: "#F5F5F5",
          justifyContent: "space-between",
    
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Link href={routes.root}>
            <img
              src="/assets/CARGO WAVE.png"
              style={{
                height: 40,
                cursor: "pointer",
                marginTop: 20
              }}
              alt="Logo"
            />
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {isAuthenticated ? (
            <ProfileBar /> // Render ProfileBar when authenticated
          ) : (
            <Button
              type="default"
              icon={<LoginOutlined />}
              style={{ fontSize: "18px", backgroundColor: "white" }}
            >
              <Link href={routes.login}>Login</Link>
            </Button>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
