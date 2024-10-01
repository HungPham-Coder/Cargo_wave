"use client";

import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import Link from "next/link";
import routes from "../router/routes";
import Sider from "antd/es/layout/Sider";
import { usePathname } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  CategoryManagement,
  Home,
  Repositioning,
  User,
  UserPositioning,
  UserToUserTransmission,
} from "@icon-park/react";

const siderStyle: React.CSSProperties = {
    backgroundColor: "#F5F5F5",
  };

const AppSider: React.FC = () => {
  type MenuItem = Required<MenuProps>["items"][number];
  const [current, setCurrent] = useState<string>("home");
  const [openKeys, setOpenKeys] = useState<string[]>(["Management"]);
  const pathname = usePathname();
  const iconSize = 20;

  const items: MenuItem[] = [
    {
      label: <Link href={routes.root}>Home</Link>,
      key: "home",
      icon: <Home size={iconSize} />,
    },
    {
      type: "divider",
    },
    {
      label: "Administration",
      key: "Administration",
      icon: <CategoryManagement theme="outline" size={iconSize} />,
      // icon: <MailOutlined />,
      children: [
        {
          label: <Link href={routes.userManagement}>User</Link>,
          icon: <User theme="outline" size={iconSize} />,
          key: "1",
        },
        {
          label: <Link href={routes.roleManagement}>Role</Link>,
          icon: <UserPositioning theme="outline" size={iconSize} />,
          key: "2",
        },
        {
          label: <Link href={routes.permissionManagement}>Permission</Link>,
          icon: <UserToUserTransmission theme="outline" size={iconSize} />,
          key: "3",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      label: <Link href={routes.route}>Route</Link>,
      key: "Route",
      icon: <Repositioning theme="outline" size={iconSize} />,
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
    <Sider style={siderStyle}>
      <Menu
      style={siderStyle}
        onClick={onClick}
        defaultSelectedKeys={[current]}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default AppSider;
