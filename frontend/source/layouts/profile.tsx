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
  background: #008afb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px; /* Minimum width to ensure it doesn't shrink too much */
  max-width: 100%; /* Ensures it doesn't overflow */
  flex-grow: 1; /* Allows the container to grow based on content size */

  &:hover {
    background: linear-gradient(135deg, #090273 30%, #0d03ad 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

const UserName = styled.span`
  color: white;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s ease;
  white-space: nowrap; /* Prevents the name from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Ellipsis if the name is too long */
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  min-width: 0; /* Ensures proper ellipsis behavior for long text */
  flex-grow: 1;
`;

const ProfileBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { userData } = useContext(UserContext);

  console.log("user in header: ", userData?.name!)

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
    <Container style={{ height: "60px", width: "auto" }}>
      <Avatar size="large" src={userData?.image} icon={<UserOutlined />} />

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
            <UserName>{userData?.name!}</UserName> {/* Display the user name */}
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
