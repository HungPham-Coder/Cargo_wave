"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/source/layouts/header";
import { Content } from "antd/es/layout/layout";
import AppFooter from "@/source/layouts/footer";
import StyledComponentsRegistry from "./registry";
import { Layout } from "antd";
import AppSider from "@/source/layouts/sider";
import { usePathname } from "next/navigation";
import routes from "@/source/router/routes";

const inter = Inter({ subsets: ["latin"] });

const contentLayout: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  backgroundColor: "#FFFFFF",
  minHeight: "82vh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname(); // Get the router instance
  const isLoginPage = pathname === routes.login; // Check if the current route is the login page

  return (
    <html lang="en">
      <head>
        <title>Cargo Wave</title>
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Layout>
            <AppHeader />
            <Layout>
              {!isLoginPage && <AppSider />}{" "}
              <Content style={contentLayout}>{children}</Content>
            </Layout>
            <AppFooter />
          </Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
