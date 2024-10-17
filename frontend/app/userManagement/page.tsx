"use client";

import UserApi from "@/source/apis/users";
import { BaseTable } from "@/source/components/baseTable";
import UserRoleModal from "@/source/components/modal/userRoleModal";
import withPermission from "@/source/components/withPermission";
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
import { Button, Col, Dropdown, MenuProps, message, Modal, Select, Tag } from "antd";
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
  const [status, setIsStatus] = useState<number | undefined>(undefined);

  const getColorById = (id: string): string => {
    const hashCode = Array.from(id).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const color = `hsl(${hashCode % 360}, 50%, 50%)`; // Using HSL for color generation
    return color;
  };

  const getData = async (
    search?: string,
    pageIndex?: number,
    status?: number,
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
        status
      });
      const response: UsersResponse = await UserApi.findAllWithPaging(
        search!,
        pageIndex! - 1,
        PageSize.USER_LIST,
        status!
      );
      setUsers(response);
      console.log("response", response);
      const url = new URL(window.location.href);
      url.searchParams.set("search", search!);
      url.searchParams.set("pageSize", PageSize.USER_LIST.toString());
      url.searchParams.set("pageIndex", pageIndex!.toString());
      if (status !== undefined) {
        url.searchParams.set("status", status.toString());
      } else {
        url.searchParams.delete("status");
      }
      router.push(url.toString());
    } catch (error) {
      message.error("Failed to fetch user");
      console.error("Failed to fetch user: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setCurrentPage(defaultPage);
    router.push(`?search=${value}`);
    getData(value, defaultPage, status, true);
  };

  const onPageChange = (current: number) => {
    setCurrentPage(current);
    getData(search, current, status, false);
  };

  const handleChange = (value: number) => {
    setIsStatus(value);
    getData(search, 1, value);
  };


  const updateUserStatus = async (userID: string, status: number) => {
    try {
      await UserApi.updateUserStatus(userID, status);
      message.success("Role status updated successfully");
      // Refresh list with current search term and page
      getData(search, currentPage, status, true);
    } catch (error) {
      message.error("Failed to update role status");
      console.error("Failed to update role status: ", error);
    }
  };

  useEffect(() => {
    getData(search, defaultPage, status, true);
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
                <Tag
                  key={role.id}
                  color={getColorById(role.id)}
                  style={{ fontWeight: 700 }}
                >
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
          statusLabel = "Banned";
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
    console.log("status", record.status);
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
        danger: status === 1,
        onClick: () => {
          Modal.confirm({
            title: status === 1 ? "Confirm Ban" : "Confirm Unban",
            content: `Are you sure you want to ${
              status === 1 ? "ban" : "unban"
            } this account?`,
            onOk: async () => {
              try {
                if (status === 2) {
                  updateUserStatus(id, 1);
                } else {
                  updateUserStatus(id, 2);
                }
                message.success("Account status updated successfully.");
                getData(search, currentPage, status, true); // Refresh the user list
              } catch (error) {
                message.error("Failed to update account status.");
                console.error("Failed to update account status: ", error);
              }
            },
            onCancel() {
              console.log("Cancelled");
            },
          });
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
        actions={
          <Col>
            <span className="mr-2">Status: </span>
            <Select
              allowClear
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "1", label: "In use" },
                { value: "2", label: "Disabled" },
              ]}
            />
          </Col>
        }
      />
      <UserRoleModal
        onCancel={() => setAssignRoleModal(false)}
        onSuccess={() => getData("", currentPage, status, true)}
        open={assignRoleModal}
        data={selectedUser}
      ></UserRoleModal>
    </div>
  );
};

export default withPermission(UserManagementList, "user_view");
