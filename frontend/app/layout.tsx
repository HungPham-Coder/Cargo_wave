import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/source/layouts/header";
import { Content } from "antd/es/layout/layout";
import AppFooter from "@/source/layouts/footer";
import StyledComponentsRegistry from "./registry";
import { Layout } from "antd";
import AppSider from "@/source/layouts/sider";

const inter = Inter({ subsets: ["latin"] });

const contentLayout: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  backgroundColor: "#FFFFFF",
  minHeight: "82vh",
  paddingTop: 20,
};

export const metadata: Metadata = {
  title: "Cargo Wave",
  description: "Generated by Hung Pham",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Layout>
            <AppHeader />
            <Layout > 
              <AppSider />
              <Content style={contentLayout}>{children}</Content>
            </Layout>
            <AppFooter />
          </Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
