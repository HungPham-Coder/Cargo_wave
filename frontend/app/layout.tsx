"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/source/layouts/header";
import { Content } from "antd/es/layout/layout";
import AppFooter from "@/source/layouts/footer";
import StyledComponentsRegistry from "./registry";
import { ConfigProvider, Layout } from "antd";
import AppSider from "@/source/layouts/sider";
import { usePathname } from "next/navigation";
import routes from "@/source/router/routes";
import { Suspense } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import UserProvider, { UserContext } from "@/source/contexts/UserContext";
import SocketComponent from "@/source/components/socketComponent";

const inter = Inter({ subsets: ["latin"] });

const contentLayout: React.CSSProperties = {
  backgroundColor: "#f0f5ff",
  minHeight: "90vh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the router instance
  const isLoginPage = pathname === routes.login; // Check if the current route is the login page
  const isRegisterPage = pathname === routes.register;
  const isForgotPage = pathname === routes.forgotPassword;

  return (
    <html lang="en">
      <head>
        <title>Cargo Wave</title>
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider>
            <UserProvider>
              <Layout>
                <SocketComponent />
                <AppHeader />
                <Layout>
                  {!isLoginPage && !isRegisterPage && !isForgotPage && (
                    <AppSider />
                  )}{" "}
                  <Suspense fallback={<div>Loading...</div>}>
                    <Content style={contentLayout}>{children}</Content>
                  </Suspense>
                </Layout>
                {!isLoginPage && !isRegisterPage && !isForgotPage && (
                  <AppFooter />
                )}{" "}
              </Layout>
            </UserProvider>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
