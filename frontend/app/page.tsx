import AppFooter from "@/component/layouts/footer";
import AppHeader from "@/component/layouts/header";
import { Content } from "antd/es/layout/layout";

const contentLayout: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  backgroundColor: "#FFFFFF",
  minHeight: "82vh",
};

export default function Home() {
  return (
    <>
      <AppHeader></AppHeader>
      <Content style={contentLayout}></Content>
      <AppFooter></AppFooter>
    </>
  );
}
