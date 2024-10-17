import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  LeftOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Avatar, Dropdown } from "antd";
import Link from "next/link";
import routes from "../router/routes";

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

const ProfileBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

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

  useEffect(() => {
    // Retrieve user and roles from localStorage
    const storedUser = localStorage.getItem("user");
  
    // Parse only if the data is present and valid
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "Unknown User");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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
      <Avatar size="large" icon={<UserOutlined />} />

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
            <UserName>{userName}</UserName> {/* Display the user name */}
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
