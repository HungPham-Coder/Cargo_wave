"use client";

import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu, Button } from "antd";
import Link from "next/link";
import routes from "../router/routes";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import {
  Home,
  CategoryManagement,
  User,
  UserPositioning,
  UserToUserTransmission,
  Repositioning,
} from "@icon-park/react";
import styled from "styled-components";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const StyledSider = styled(Sider)<{ $collapsed: boolean }>`
  background: linear-gradient(
    135deg,
    #0d3b66 0%,
    #00a6fb 100%
  ); /* Deep sea blue to turquoise gradient */
  padding: 20px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space evenly */
  .ant-layout-sider-trigger {
    background-color: #00a6fb; /* Color for the collapse button */
  }
`;

const StyledMenu = styled(Menu)`
  background: transparent !important;
  color: #fff !important;
  flex-grow: 1; /* Make menu take up remaining space */
  margin-bottom: 20px; /* Add margin to create space from the button */

  .ant-menu-item {
    color: #fff !important;
    transition: all 0.3s ease-in-out;
  }

  .ant-menu-submenu-title {
    color: #fff !important;
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    background-color: rgba(
      255,
      255,
      255,
      0.1
    ) !important; /* Light overlay on hover */
    box-shadow: 0 4px 8px rgba(0, 166, 251, 0.4); /* Soft glow effect */
  }

  .ant-menu-item-selected {
    background-color: #00a6fb !important; /* Bright turquoise for selected item */
    border-radius: 8px; /* Rounded corners for selected item */
    color: #fff !important;
    box-shadow: 0 0 12px rgba(0, 166, 251, 0.7); /* Stronger glow on selection */
  }
`;

const iconSize = 20;

const AppSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false); // State to control collapse
  const [current, setCurrent] = useState<string>("home");
  const [openKeys, setOpenKeys] = useState<string[]>(["Administration"]);
  const pathname = usePathname();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  const items: Required<MenuProps>["items"][number][] = [
    {
      label: <Link href={routes.root}>Home</Link>,
      key: "home",
      icon: <Home size={iconSize} fill="#FFF" />,
    },
    { type: "divider" },
    {
      label: "Administration",
      key: "Administration",
      icon: <CategoryManagement size={iconSize} fill="#FFF" />,
      children: [
        {
          label: <Link href={routes.userManagement}>User</Link>,
          icon: <User size={iconSize} fill="#FFF" />,
          key: "userManagement",
        },
        {
          label: <Link href={routes.roleManagement}>Role</Link>,
          icon: <UserPositioning size={iconSize} fill="#FFF" />,
          key: "roleManagement",
        },
        {
          label: <Link href={routes.permissionManagement}>Permission</Link>,
          icon: <UserToUserTransmission size={iconSize} fill="#FFF" />,
          key: "permissionManagement",
        },
      ],
    },
    { type: "divider" },
    {
      label: <Link href={routes.route}>Route</Link>,
      key: "routes",
      icon: <Repositioning size={iconSize} fill="#FFF" />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const path = pathname.substring(1) || "home";
    setCurrent(path);
  }, [pathname]);

  return (
    <StyledSider $collapsed={collapsed} width={250} collapsed={collapsed}>
      <StyledMenu
        onClick={onClick}
        selectedKeys={[current]}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={items}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 20 }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>
    </StyledSider>
  );
};

export default AppSider;
