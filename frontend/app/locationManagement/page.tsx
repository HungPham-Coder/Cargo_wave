"use client";

import RoleApi from "@/source/apis/roles";
import { BaseTable } from "@/source/components/baseTable";
import RoleModal from "@/source/components/modal/roleModal";
import RolePermissionModal from "@/source/components/modal/rolePermissionModal";
import RoleUpdateModal from "@/source/components/modal/roleUpdateModal";
import { PageSize } from "@/source/constants/app";
import { Forbid, ListAdd, More, Unlock, User } from "@icon-park/react";
import { Button, Dropdown, MenuProps, message } from "antd";
import confirm from "antd/es/modal/confirm";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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

interface Permission {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface Role {
  id: string;
  name: string;
  isDisabled: boolean;
  permissions?: Permission[];
}

interface RolesResponse {
  data: Role[];
  total: number;
}

interface SelectedRole {
  id?: string;
  name?: string;
  permissions?: string[]; // Make sure to define permissions here
  isDeleted?: boolean;
}

const LocationManagementList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<RolesResponse>({ data: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const defaultPage = 1;
  const [showItemModal, setShowItemModal] = useState(false);
  const [roleCreating, setRoleCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateRoleNameModal, setShowUpdateRoleNameModal] = useState(false);
  const [assignPermissionModal, setAssignPermissionModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SelectedRole | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";

  const getData = async (
    search?: string,
    pageIndex?: number,
    handleLoading?: boolean
  ) => {
    if (handleLoading) {
      setLoading(true);
    }
    try {
      const response: RolesResponse = await RoleApi.findAllWithPaging(
        search!,
        pageIndex! - 1,
        PageSize.ROLE_LIST
      );
      setRoles(response);
    } catch (error) {
      message.error("Failed to fetch roles");
      console.error("Failed to fetch roles: ", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Roles: ", roles);

  const handleCreateRoles = async (names: string[]) => {
    setRoleCreating(true);
    try {
      await RoleApi.createRole({ names });
      getData(search, currentPage, true);
    } catch (error) {
      message.error("Failed to create roles");
      console.error("Failed to create roles: ", error);
    } finally {
      setRoleCreating(false);
    }
  };

  const updateRoleStatus = async (roleID: string, isDisabled: boolean) => {
    try {
      await RoleApi.updateRoleStatus(roleID, isDisabled);
      message.success("Role status updated successfully");
      // Refresh list with current search term and page
      getData(searchTerm, currentPage, true);
    } catch (error) {
      message.error("Failed to update role status");
      console.error("Failed to update role status: ", error);
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

  const columns: ColumnType<{
    key: string;
    name: string;
    permissions: Permission[];
    isDisabled: boolean;
  }>[] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
      // align: "center",
      render: (_, record, index) => {
        return (
          <span>{index + 1 + (currentPage - 1) * PageSize.ROLE_LIST}</span>
        );
      },
    },
    {
      title: "Role name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: Permission[]) => (
        <span>
          {permissions.map((permission, i) => (
            <div key={permission.id}>
              {" "}
              {i + 1}. {permission.name}
            </div>
          ))}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "isDisabled",
      key: "isDisabled",
      render: (isDisabled: boolean) => (
        <span
          style={{
            color: !isDisabled ? "#29CB00" : "#FF0000",
            fontWeight: "bold",
          }}
        >
          {!isDisabled ? "In use" : "Disabled"}
        </span>
      ),
      filter: {
        placeholder: "Role status",
        label: "Status",
        filterOptions: [
          {
            label: "In use",
            value: false,
          },
          {
            label: "Disabled",
            value: true,
          },
        ],
      },
      sorter: (a, b) => Number(a.isDisabled) - Number(b.isDisabled),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record: any) => (
        <Dropdown menu={{ items: getActionItems(record) }}>
          <Button icon={<More />} />
        </Dropdown>
      ),
    },
  ];

  const getActionItems = (record: {
    isDisabled: boolean;
    id: string;
    name: string;
    permissions: Permission[];
  }): MenuProps["items"] => {
    const { isDisabled, id, name, permissions } = record;

    return [
      {
        key: "UPDATE_ROLE",
        label: "Update role",
        icon: <User size="16" />,
        onClick: () => {
          setSelectedRole({ id, name });
          setShowUpdateRoleNameModal(true);
        },
      },
      {
        key: "ASSIGN_PERMISSION",
        label:
          permissions.length === 0
            ? "Assign permissions"
            : "Update permissions",
        icon: <ListAdd size="16" />,
        onClick: () => {
          setSelectedRole({
            id,
            name: record.name,
            permissions: permissions?.map((p) => p.id),
          });
          setAssignPermissionModal(true);
        },
      },
      {
        key: "SET_STATUS",
        label: isDisabled ? "Enable role" : "Disable role",
        danger: !isDisabled,
        icon: isDisabled ? <Unlock /> : <Forbid />,
        onClick: () => {
          confirm({
            title: isDisabled
              ? "Do you want to enable role?"
              : "Do you want to disable role?",
            type: "confirm",
            cancelText: "Cancel",
            onOk: () => updateRoleStatus(id, !isDisabled),
            onCancel: () => {},
            closable: true,
          });
        },
      },
    ];
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaseTable
        rowKey="id"
        title="Location management"
        loading={loading}
        dataSource={
          roles?.data?.map((role) => ({
            ...role,
            key: role.id,
            permissions: role.permissions || [],
          })) || []
        }
        columns={columns}
        pagination={{
          current: currentPage,
          onChange: onPageChange,
          pageSize: PageSize.ROLE_LIST,
          total: roles.total,
        }}
        searchOptions={{
          visible: true,
          placeholder: "Search roles...",
          onSearch: handleSearch,
          width: 300,
        }}
        addButton={
          <Button
            type="primary"
            className="btn-primary app-bg-primary font-semibold text-white"
            onClick={() => setShowItemModal(true)}
          >
            Create role
          </Button>
        }
      />
      <RoleUpdateModal
        onCancel={() => setShowUpdateRoleNameModal(false)}
        onSuccess={() => getData(undefined, defaultPage, true)}
        open={showUpdateRoleNameModal}
        data={selectedRole}
      />
      <RoleModal
        onCancel={() => setShowItemModal(false)}
        onSuccess={() => getData(undefined, defaultPage, true)}
        open={showItemModal}
        data={undefined}
      />
      <RolePermissionModal
        onCancel={() => setAssignPermissionModal(false)}
        onSuccess={() => getData(undefined, defaultPage, true)}
        open={assignPermissionModal}
        data={selectedRole}
      ></RolePermissionModal>
    </Suspense>
  );
};

export default LocationManagementList;