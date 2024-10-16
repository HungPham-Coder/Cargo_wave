import React, { useContext, useEffect, useState } from "react";
import {
  DownOutlined,
  LeftOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Avatar, Dropdown, message } from "antd";
import Link from "next/link";
import routes from "../router/routes";
import UserApi from "../apis/users";
import { UserContext } from "../contexts/UserContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 200px;
  color: white;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(135deg, #007bb2 0%, #00a2e8 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #090273 30%, #0d03ad 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

const UserName = styled.span`
  color: white; /* White text for better visibility */
  font-size: 20px;
  font-weight: 600;
  transition: color 0.3s ease;
`;

const RoleName = styled.span`
  color: #e0f7fa; /* Light cyan for role name */
  font-size: 14px;
  font-weight: 400;
  margin-top: -2.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

interface User {
  id: string;
  name: string;
}

const ProfileBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(UserContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwtAccessToken");
    localStorage.removeItem("jwtAccessExpire");
    localStorage.removeItem("jwtRefreshExpire");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    window.location.reload();
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {});

  const items = [
    {
      key: "PROFILE",
      label: <Link href={routes.profile}>Profile</Link>,
      icon: <UserOutlined style={{ color: "white" }} />, // White icon for contrast
    },
    {
      key: "LOGOUT",
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <LogoutOutlined style={{ color: "red" }} />, // Red icon for logout
      danger: true,
    },
  ];

  return (
    <Container style={{ height: "60px" }}>
      <Avatar size="large" src={user?.image} icon={<UserOutlined />} />

      <Dropdown menu={{ items }} trigger={["hover"]}>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            height: "50px",
          }}
        >
          <UserInfo>
            <UserName>{user?.name}</UserName> {/* Display the user name */}
          </UserInfo>
          {isHovered ? (
            <DownOutlined
              style={{ color: "white", fontSize: "16px", marginLeft: "8px" }}
            />
          ) : (
            <LeftOutlined
              style={{ color: "white", fontSize: "16px", marginLeft: "8px" }}
            />
          )}
        </span>
      </Dropdown>
    </Container>
  );
};

export default ProfileBar;
