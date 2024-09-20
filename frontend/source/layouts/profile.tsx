import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  LeftOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Avatar, Dropdown, Space } from "antd";
import Link from "next/link";
import routes from "../router/routes";

const Container = styled.div`
  color: white;
`;

const ProfileBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  };

  const items = [
    {
      key: "PROFILE",
      label: <Link href={routes.profile}>Profile</Link>,
      // label: <span>Profile</span>,
      icon: <UserOutlined />,
    },
    {
      key: "HISTORY",
      label: <Link href={routes.history}>History</Link>,
      // label: <span>History</span>,
      icon: <UserOutlined />,
    },
    {
      key: "LOGOUT",
      label: <span>Logout</span>,
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Container>
      <Space size={24} style={{ margin: "0 0.5rem" }}>
        <Avatar size="default" icon={<UserOutlined />} />
        {/* <img width={30} height={30} src={user?.image} /> */}
      </Space>
      <Dropdown
        menu={{
          items,
        }}
      >
        <span
          className="text-[#666] font-semibold"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* {user?.fullName} */}
          <span style={{ color: "black", fontSize: 22, marginRight: 5 }}>
            abc
          </span>

          {isHovered ? (
            <DownOutlined
              className="ml-1 top-[0.2rem] bottom-0"
              style={{ color: "black", cursor: "pointer" }}
            />
          ) : (
            <LeftOutlined
              className="ml-1 top-[0.2rem] bottom-0"
              style={{ color: "black", cursor: "pointer" }}
            />
          )}
        </span>
      </Dropdown>
    </Container>
  );
};

export default ProfileBar;
