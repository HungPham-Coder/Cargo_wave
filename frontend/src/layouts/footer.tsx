import { Footer } from "antd/es/layout/layout";

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: "center", marginTop: 20 }}>
      &copy;{new Date().getFullYear()} Created by Hung Pham.
    </Footer>
  );
};

export default AppFooter;
