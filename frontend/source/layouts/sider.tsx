"use client";

import React, { useContext, useEffect, useState } from "react";
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
  ChartLine,
} from "@icon-park/react";
import styled from "styled-components";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GetValueFromScreen, UseScreenWidth } from "./screen";
import { usePermission } from "../hook/usePermission";
import { UserContext } from "../contexts/UserContext";

const StyledSider = styled(Sider)<{ $collapsed: boolean }>`
  background: #063464 !important;
`;

const StyledMenu = styled(Menu)`
  background: transparent !important;
  flex-grow: 1; /* Make menu take up remaining space */
  margin-bottom: 20px; /* Add margin to create space from the button */

  /* Default text color for menu items and submenu titles */
  .ant-menu-item,
  .ant-menu-submenu-title {
    color: white !important; /* Set default color to white */
  }

  /* Hover effect for menu items and submenu titles */
  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    color: #f08650 !important; /* Change text color on hover */
  }

  /* Prevent background color change */
  .ant-menu-item:hover {
    background-color: transparent !important; /* No background change */
  }

  .ant-menu-item-selected {
    background-color: #008afb !important; /* Bright turquoise for selected item */
    border-radius: 8px; /* Rounded corners for selected item */
    color: #fff !important; /* Text color for selected item */
    box-shadow: 0 0 12px rgba(0, 166, 251, 0.7); /* Stronger glow on selection */
  }

  .ant-menu-item-selected {
    transition: background-color 0.3s ease; /* Smooth transition */
  }
`;

const iconSize = 20;

const AppSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false); // State to control collapse
  const [current, setCurrent] = useState<string>("home");
  const [openKeys, setOpenKeys] = useState<string[]>(["Administration"]);
  const [canAccessAdministration, setCanAccessAdministration] =
    useState<boolean>(false);
  const pathname = usePathname();
  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(
    screenWidth,
    true,
    true,
    false,
    false,
    false,
    false
  );
  const { hasPermission } = usePermission();
  const { userData } = useContext(UserContext);
  console.log("userData in sider", userData);

  console.log("collapsed", collapsed);

  useEffect(() => {
    const access =
      hasPermission("user_view") ||
      hasPermission("role_view") ||
      hasPermission("permission_view");
    setCanAccessAdministration(access);
  }, [userData]);

  const toggleCollapsed = () => {
    if (responsive) {
      setCollapsed(responsive);
    }
    setCollapsed(responsive);
  };

  const onClickCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: Required<MenuProps>["items"][number][] = [
    {
      label: <Link href={routes.root}>Home</Link>,
      key: "home",
      icon: <Home size={iconSize} />,
    },
    { type: "divider" },
    ...(hasPermission("dashboard_view") // Check permission for Dashboard
      ? [
          {
            label: <Link href={routes.dashboard}>Dashboard</Link>,
            key: "dashboard",
            icon: <ChartLine size={iconSize} />,
          },
        ]
      : []),
    { type: "divider" },
    ...(canAccessAdministration
      ? [
          {
            label: "Administration",
            key: "Administration",
            icon: <CategoryManagement size={iconSize} />,
            children: [
              hasPermission("user_view")
                ? {
                    label: <Link href={routes.userManagement}>User</Link>,
                    icon: <User size={iconSize} />,
                    key: "userManagement",
                  }
                : null,
              hasPermission("role_view")
                ? {
                    label: <Link href={routes.roleManagement}>Role</Link>,
                    icon: <UserPositioning size={iconSize} />,
                    key: "roleManagement",
                  }
                : null,
              hasPermission("permission_view")
                ? {
                    label: (
                      <Link href={routes.permissionManagement}>Permission</Link>
                    ),
                    icon: <UserToUserTransmission size={iconSize} />,
                    key: "permissionManagement",
                  }
                : null,
            ].filter((item): item is NonNullable<typeof item> => item !== null), // Filter out null values
          },
        ]
      : []),
    { type: "divider" },
    ...(hasPermission("route_view") // Check permission for Routes
      ? [
          {
            label: <Link href={routes.route}>Route</Link>,
            key: "routes",
            icon: <Repositioning size={iconSize} />,
          },
        ]
      : []),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const path = pathname.substring(1) || "home";
    setCurrent(path);
    toggleCollapsed();
  }, [pathname, responsive]);

  return (
    <StyledSider $collapsed={collapsed} width={250} collapsed={collapsed}>
      <StyledMenu
        style={{ marginTop: 20 }}
        onClick={onClick}
        selectedKeys={[current]}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={items}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={onClickCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>
    </StyledSider>
  );
};

export default AppSider;
