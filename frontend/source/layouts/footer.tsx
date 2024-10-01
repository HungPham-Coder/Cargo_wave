import { Footer } from "antd/es/layout/layout";

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  borderBottom: "1px solid #eee",
  backgroundColor: "#F5F5F5",
};

const AppFooter: React.FC = () => {
  return (
    <Footer style={footerStyle}>
      &copy;{new Date().getFullYear()} Created by Hung Pham.
    </Footer>
  );
};

export default AppFooter;
