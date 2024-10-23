"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import ProfileBar from "./profile";
import { LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import routes from "../router/routes";
import { useAuth } from "../mocks/auth";
import { UserContext } from "../contexts/UserContext";

const AppHeader: React.FC = () => {
  const isAuthenticated = useAuth(); // Get authentication status from custom hook
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#00b4ff",
          // background: "#FFFFFF",
          padding: "0 20px",
          height: "90px",
        }}
      >
        <div style={{ flex: 1 }}></div>
       

        <div style={{ flex: 1,  zIndex: 2}}>
          <Link href={routes.root}>
            <img
              src="/assets/CARGO WAVE.png" // Your uploaded logo path
              style={{
                height: 40,
                marginTop: 20
              }}
              alt="Cargo Wave Logo"
            />
          </Link>
        </div>

        <div className="cloud-container" style={{ zIndex: 1, marginTop: 20 }}>
          <div style={{ flex: 1 }}></div>
          <div className="x1">
            <div className="cloud"></div>
          </div>

          <div className="x2">
            <div className="cloud"></div>
          </div>

          <div className="x3">
            <div className="cloud"></div>
          </div>

          <div className="x4">
            <div className="cloud"></div>
          </div>

          <div className="x5">
            <div className="cloud"></div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", zIndex: 2 }}>
          {isAuthenticated ? (
            <ProfileBar />
          ) : (
            <Button
              type="default"
              icon={<LoginOutlined />}
              style={{
                fontSize: "16px",
                backgroundColor: "#fff",
                border: "2px solid #5f5f5f",
                borderRadius: "8px",
                color: "#004080",
                padding: "0 16px",
                fontWeight: "bold",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#008afb";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#004080";
              }}
            >
              <Link href={routes.login} style={{ color: "inherit" }}>
                Login
              </Link>
            </Button>
          )}
        </div>

        
      </Header>
    </Layout>
  );
};

export default AppHeader;
