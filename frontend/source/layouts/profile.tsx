import React, { useState } from "react";
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
  padding: 0.5rem 1rem; /* Increased padding for a more spacious feel */
  border-radius: 200px; /* Rounded corners */
  color: white; /* White text for better contrast */
  transition: background 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions */
  background: linear-gradient(135deg, #007bb2 0%, #00a2e8 100%); /* Sea-themed gradient */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */

  &:hover {
    background: linear-gradient(135deg, #090273 30%, #0D03AD 100%); /* Darker gradient on hover */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.dispatchEvent(new Event("storage"));
  };

  const items = [
    {
      key: "PROFILE",
      label: <Link href={routes.profile}>Profile</Link>,
      icon: <UserOutlined style={{ color: "white" }} />, // White icon for contrast
    },
    {
      key: "HISTORY",
      label: <Link href={routes.history}>History</Link>,
      icon: <UserOutlined style={{ color: "white" }} />, // White icon for contrast
    },
    {
      key: "LOGOUT",
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <LogoutOutlined style={{ color: "red" }} />, // Red icon for logout
      danger: true,
    },
  ];

  const userRole = "Admin"; // Replace with actual user role from your auth state
  const userName = "admin"; // Replace with actual user name from your auth state

  return (
    <Container style={{ height: "50px" }}>
      <Avatar size="large" icon={<UserOutlined />} />

      <Dropdown menu={{ items }} trigger={["hover"]}>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ display: "flex", alignItems: "center", cursor: "pointer", height: "50px" }}
        >
          <UserInfo>
            <UserName>{userName}</UserName> {/* Show user name from auth */}
            <RoleName>{userRole}</RoleName> {/* Show user role here */}
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
