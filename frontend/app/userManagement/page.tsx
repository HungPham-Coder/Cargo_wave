"use client";

import UserApi from "@/source/apis/users";
import { BaseTable } from "@/source/components/baseTable";

import { Edit, Forbid, More, Phone, Unlock, User } from "@icon-park/react";
import { Button, Dropdown } from "antd";
import { useEffect, useState } from "react";

interface ColumnType<T> {
  title: string;
  dataIndex: keyof T | "index" | "action";
  key: string;
  width?: string;
  render?: (text: any, record: T, index: number) => JSX.Element;
  sorter?: (a: T, b: T) => number;
  filter?: {
    placeholder: string;
    label: string;
    filterOptions: {
      label: string;
      value: any;
    }[];
  };
}

const UserManagementList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    setLoading(true);
    const response = await UserApi.findAll();
    console.log(response);
    setUsers(response);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const roleColors: { [key in "Admin" | "Manager" | "Employee"]: string } = {
    Admin: "#FF7777",
    Manager: "#4ECA69",
    Employee: "#59A7DE",
  };
  const columns: ColumnType<{
    key: string;
    name: string;
    email: string;
    phone_number: string;
    roles: { id: number; name: string }[];
    status: boolean;
  }>[] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (_: any, record: any, index: number) => (
        <span>{index + 1 + (currentPage - 1) * 10}</span>
      ),
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      render: (roles: { id: number; name: string }[]) => (
        <span>
          {roles.map((role) => (
            <span
              key={role.id}
              style={{
                backgroundColor:
                  roleColors[role.name as "Admin" | "Manager" | "Employee"] ||
                  "#ccc", // Use colors based on role name
                color: "#fff",
                padding: "2px 8px",
                borderRadius: "4px",
                marginRight: "5px",
                fontWeight: "bold",
              }}
            >
              {role.name ? role.name : "-"}
            </span>
          ))}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <span
          style={{
            color: status ? "#29CB00" : "#FF0000",
            fontWeight: "bold",
          }}
        >
          {status ? "In use" : "Banned"}
        </span>
      ),
      filter: {
        placeholder: "Status",
        label: "Status",
        filterOptions: [
          {
            label: "In use",
            value: false,
          },
          {
            label: "Banned",
            value: true,
          },
        ],
      },
      sorter: (a, b) => Number(a.status) - Number(b.status),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <Dropdown menu={{ items: getActionItems(record) }}>
          <Button className="mx-auto flex-center" icon={<More />} />
        </Dropdown>
      ),
    },
  ];

  const getActionItems = (record: { banStatus: any; id: any; role: any }) => {
    const { banStatus, id, role } = record;

    return [
      {
        key: "UPDATE_USER",
        label: "Update user information",
        icon: <Edit />,
        // disabled: role === roles.ADMIN,
        onClick: () => {
          // userRef.current = record;
          // setShowUserModal(true);
        },
      },
      {
        key: "UPDATE_PHONE",
        label: "Update phone number",
        icon: <Phone />,
        onClick: () => {
          // userRef.current = record;
          // setShowPhoneModal(true);
        },
      },
      {
        key: "UPDATE_ROLE",
        label: "Update role",
        icon: <User />,
        // disabled: role === roles.ADMIN,
        onClick: () => {
          // userRef.current = record;
          // setShowModal(true);
        },
      },
      {
        key: "SET_STATUS",
        title: banStatus ? "Unban account" : "Ban account",
        danger: !banStatus,
        icon: !banStatus ? <Forbid /> : <Unlock />,
        onClick: () => {
          if (banStatus) {
            // unbanUser(id);
          } else {
            // banUser(id);
          }
        },
      },
    ];
  };

  return (
    <div style={{ paddingLeft: 30, paddingRight: 30 }}>
      <BaseTable
        rowKey="id"
        title="User management"
        loading={loading}
        dataSource={user}
        columns={columns}
        pagination={
          {
            // onChange: onPageChange,
            // pageSize: PageSize.EMPLOYEES_LIST,
            // total: user?.total,
          }
        }
        searchOptions={{
          visible: true,
          placeholder: "Search account...",
          // onSearch: handleSearch,
          width: 300,
        }}
      />
    </div>
  );
};

export default UserManagementList;
