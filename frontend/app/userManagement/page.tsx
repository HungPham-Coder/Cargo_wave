"use client";

import { BaseTable } from "@/source/components/baseTable";
import { getRoleName } from "@/source/constants/app";
import { userMocks } from "@/source/mocks/mocks";
import {
  EditFilled,
  PhoneFilled,
  UnlockFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Edit, Forbid, More, Phone, Unlock, User } from "@icon-park/react";
import { Button, Dropdown, Tag } from "antd";
import { useState } from "react";

interface ColumnType<T> {
  title: string;
  dataIndex: keyof T | 'index' | 'action';
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
  const [roleOptions, setRoleOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const roleColors = {
    ADMIN: "#FF7777",
    FOREMAN: "#4ECA69",
    LEADER: "#F1CA5A",
    WORKER: "#59A7DE",
  };

  const columns: ColumnType<{
    key: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    roleId: string;
    banStatus: boolean;
  }>[] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (_: any, record: any, index: number) => (
        <span>{index + 1 + (currentPage - 1)}</span>
      ),
    },
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
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
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      // Render and filter code here (not provided in this snippet)
    },
    {
      title: "Status",
      dataIndex: "banStatus",
      key: "banStatus",
      render: (banStatus: boolean) => (
        <span
          style={{
            color: !banStatus ? "#29CB00" : "#FF0000",
            fontWeight: "bold",
          }}
        >
          {!banStatus ? "In use" : "Banned"}
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
      sorter: (a, b) => Number(a.banStatus) - Number(b.banStatus),
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
        title: "Status",
        dataIndex: "banStatus",
        key: "banStatus",
        render: (_: any, { banStatus }: { banStatus: boolean }) => {
          return (
            <span
              style={{
                color: !banStatus ? "#29CB00" : "#FF0000",
                fontWeight: "bold",
              }}
            >
              {!banStatus ? "In use" : "Banned"}
            </span>
          );
        },
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
        sorter: (a: { banStatus: any }, b: { banStatus: any }) =>
          Number(a.banStatus) - Number(b.banStatus), // Compare boolean values converted to numbers
      },
    ];
  };

  return (
    <div style={{ paddingLeft: 30, paddingRight: 30 }}>
      <BaseTable
        title="User management"
        loading={loading}
        dataSource={userMocks}
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
          placeholder: "Tìm kiếm tài khoản...",
          // onSearch: handleSearch,
          width: 300,
        }}
      />
    </div>
  );
};

export default UserManagementList;
