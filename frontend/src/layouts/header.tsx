import React, { useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import ProfileBar from "./profile";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
  // const router = useRouter();

  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  // const [route, setRoute] = useState(router.pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const handleLogoClick = () => {
    navigate("/");
    setCurrent("home");
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
    },
    {
      label: <Link to="/price">Price</Link>,
      key: "price",
    },
    {
      label: <Link to="/Route">Route</Link>,
      key: "route",
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrent("home");
    } else if (path === "/price") {
      setCurrent("price");
    } else if (path === "/Route") {
      setCurrent("route");
    }
  }, [location.pathname]);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
        backgroundColor: "white",
        padding: "0 20px",
        marginBottom: 20,
      }}
    >
      <div>
        <img
          src="/assets/CARGO WAVE.png"
          style={{
            marginLeft: 50,
            marginTop: 20,
            cursor: "pointer",
            height: 40,
          }}
          alt="Logo"
          onClick={handleLogoClick}
        />
      </div>
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
        }}
      />
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <ProfileBar />
      </div>
    </Header>
  );
};

export default AppHeader;
