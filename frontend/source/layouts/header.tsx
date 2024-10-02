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
          justifyContent: "space-between",
          backgroundColor: "#F5F5F5", // Navy blue, representing shipping theme
          padding: "0 20px",
          height: "80px", // Set header height to ensure proper centering
        }}
      >
        {/* Empty div to balance the layout */}
        <div style={{ flex: 1 }}></div>

        {/* Centered Logo Section */}
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          <Link href={routes.root}>
            <img
              src="/assets/CARGO WAVE.png" // Your uploaded logo path
              style={{
                height: 40,
                marginTop: 20,
                objectFit: "contain", // Ensure the logo scales without distortion
              }}
              alt="Cargo Wave Logo"
            />
          </Link>
        </div>

        {/* Navigation and Authentication Section */}
        <div style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
          {isAuthenticated ? (
            <ProfileBar /> // Render ProfileBar when authenticated
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
                e.currentTarget.style.backgroundColor = "#0066cc";
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
