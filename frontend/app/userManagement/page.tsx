"use client";

import UserApi from "@/source/apis/users";
import { BaseTable } from "@/source/components/baseTable";
import UserRoleModal from "@/source/components/modal/userRoleModal";
import { PageSize } from "@/source/constants/app";
import {
  Edit,
  Forbid,
  ListAdd,
  More,
  Phone,
  Unlock,
  User as Users,
} from "@icon-park/react";
import { Button, Dropdown, MenuProps, message, Tag } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
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

interface Roles {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface Users {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: number;
  dob: Date;
  image: string;
  roles: Roles[];
  status: number;
  description: string;
}

interface UsersResponse {
  data: Users[];
  total: number;
}

interface SelectedUser {
  id: string;
  name: string;
  roles: string[];
}

const UserManagementList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersResponse>({
    data: [],
    total: 0,
  });
  const [assignRoleModal, setAssignRoleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultPage = 1;
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const [selectedUser, setSelectedUser] = useState<SelectedUser | undefined>();

  const getData = async (
    search?: string,
    pageIndex?: number,
    handleLoading?: boolean
  ) => {
    if (handleLoading) {
      setLoading(true);
    }
    try {
      console.log("Fetching data with params:", {
        search,
        pageIndex,
        pageSize: PageSize.USER_LIST,
      });
      const response: UsersResponse = await UserApi.findAllWithPaging(
        search!,
        pageIndex! - 1,
        PageSize.PERMISSION_LIST
      );
      setUsers(response);

      const url = new URL(window.location.href);
      url.searchParams.set("search", search!);
      url.searchParams.set("pageSize", PageSize.PERMISSION_LIST.toString());
      url.searchParams.set("pageIndex", pageIndex!.toString());
      router.push(url.toString());
    } catch (error) {
      message.error("Failed to fetch permissions");
      console.error("Failed to fetch permissions: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (value: string) => {
    setCurrentPage(defaultPage);
    router.push(`?search=${value}`);
    getData(value, defaultPage, true);
  };

  const onPageChange = (current: number) => {
    setCurrentPage(current);
    getData(search, current, false);
  };

  useEffect(() => {
    getData(search, defaultPage, true);
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
    roles: Roles[];
    status: number;
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
      render: (roles: Roles[]) => (
        <div>
          {roles.length > 0 ? (
            roles
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((role) => (
                <Tag key={role.id} color="blue">
                  {role.name}
                </Tag>
              ))
          ) : (
            <span>No roles assigned</span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        let statusLabel: string;
        let statusColor: string;

        if (status === 1) {
          statusLabel = "In Use";
          statusColor = "#29CB00"; // Green
        } else if (status === 2) {
          statusLabel = "Disabled";
          statusColor = "#FF0000"; // Red
        } else {
          statusLabel = "Unknown"; // Fallback label
          statusColor = "#000"; // Default color
        }

        return (
          <span style={{ color: statusColor, fontWeight: "bold" }}>
            {statusLabel}
          </span>
        );
      },
      // filter: {
      //   placeholder: "Status",
      //   label: "Status",
      //   filterOptions: [
      //     {
      //       label: "In Use",
      //       value: 1,
      //     },
      //     {
      //       label: "Disabled",
      //       value: 2,
      //     },
      //   ],
      // },
      sorter: (a, b) => a.status - b.status,
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

  const getActionItems = (record: {
    status: number;
    id: string;
    name: string;
    roles: Roles[];
  }): MenuProps["items"] => {
    const { status, id, roles, name } = record;
    console.log("ID", record.id);
    return [
      // {
      //   key: "UPDATE_USER",
      //   label: "Update user information",
      //   icon: <Edit />,
      //   // disabled: role === roles.ADMIN,
      //   onClick: () => {
      //     // userRef.current = record;
      //     // setShowUserModal(true);
      //   },
      // },
      // {
      //   key: "UPDATE_PHONE",
      //   label: "Update phone number",
      //   icon: <Phone />,
      //   onClick: () => {
      //     // userRef.current = record;
      //     // setShowPhoneModal(true);
      //   },
      // },
      {
        key: "ASSIGN_PERMISSION",
        label: roles.length === 0 ? "Assign permissions" : "Update permissions",
        icon: <ListAdd size="16" />,
        onClick: () => {
          setSelectedUser({
            id: record.id,
            name,
            roles: roles.map((role) => role.id),
          });
          setAssignRoleModal(true);
        },
      },
      {
        key: "BAN_ACCOUNT",
        label: status === 1 ? "Ban account" : "Unban account",
        icon: status === 1 ? <Forbid /> : <Unlock />,
        onClick: () => {
          if (status === 1) {
            // Call your unban function here
            console.log(`Banning user with ID: ${id}`);
          } else {
            // Call your ban function here
            console.log(`Unbanning user with ID: ${id}`);
          }
        },
      },
    ];
  };

  return (
    <div>
      <BaseTable
        rowKey="id"
        title="User management"
        loading={loading}
        dataSource={
          users.data?.map(
            (user: {
              id: any;
              name: any;
              email: any;
              phone_number: any;
              roles: Roles[];
              status: number;
            }) => ({
              key: user.id,
              id: user.id,
              name: user.name,
              email: user.email,
              phone_number: user.phone_number,
              roles:
                user.roles?.map((r: { id: any; name: any }) => ({
                  id: String(r.id),
                  name: r.name,
                  isDisabled: false,
                })) || [],
              status: user.status,
            })
          ) || []
        }
        columns={columns}
        pagination={{
          onChange: onPageChange,
          pageSize: PageSize.USER_LIST,
          total: users.total,
        }}
        searchOptions={{
          visible: true,
          placeholder: "Search users...",
          onSearch: handleSearch,
          width: 300,
        }}
      />
      <UserRoleModal
        onCancel={() => setAssignRoleModal(false)}
        onSuccess={() => getData(undefined, defaultPage, true)}
        open={assignRoleModal}
        data={selectedUser}
      ></UserRoleModal>
    </div>
  );
};

export default UserManagementList;
