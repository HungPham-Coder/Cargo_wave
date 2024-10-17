"use client";

import RoleApi from "@/source/apis/roles";
import { BaseTable } from "@/source/components/baseTable";
import RoleModal from "@/source/components/modal/roleModal";
import RolePermissionModal from "@/source/components/modal/rolePermissionModal";
import RoleUpdateModal from "@/source/components/modal/roleUpdateModal";
import withPermission from "@/source/components/withPermission";
import { PageSize } from "@/source/constants/app";
import { usePermission } from "@/source/contexts/PermissionContext";
import { Forbid, ListAdd, More, Unlock, User } from "@icon-park/react";
import {
  Button,
  Col,
  Dropdown,
  MenuProps,
  message,
  Select,
  Tag,
  Tooltip,
} from "antd";
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
}

interface Permission {
  id: string;
  name: string;
  description: string;
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
  permissions?: string[];
}

const RoleManagementList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<RolesResponse>({ data: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [showItemModal, setShowItemModal] = useState(false);
  const [roleCreating, setRoleCreating] = useState(false);
  const [showUpdateRoleNameModal, setShowUpdateRoleNameModal] = useState(false);
  const [assignPermissionModal, setAssignPermissionModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState<boolean | undefined>(undefined);
  const [selectedRole, setSelectedRole] = useState<SelectedRole | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const { hasPermission } = usePermission();

  const canAccessCreateRole = hasPermission("role_create");
  const canAccessUpdateRole = hasPermission("role_update");
  const canAccessDisableRole = hasPermission("role_create");

  const getData = async (
    search?: string,
    pageIndex?: number,
    status?: boolean
  ) => {
    setLoading(true);
    try {
      const response: RolesResponse = await RoleApi.findAllWithPaging(
        search || "",
        pageIndex ? pageIndex - 1 : 0,
        PageSize.ROLE_LIST,
        status!
      );
      setRoles(response);

      const url = new URL(window.location.href);
      url.searchParams.set("search", search || "");
      url.searchParams.set("pageSize", PageSize.ROLE_LIST.toString());
      url.searchParams.set("pageIndex", (pageIndex || 1).toString());

      if (status !== undefined) {
        url.searchParams.set("status", status.toString());
      } else {
        url.searchParams.delete("status");
      }
      router.push(url.toString());
    } catch (error) {
      message.error("Failed to fetch roles");
      console.error("Failed to fetch roles: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoles = async (names: string[]) => {
    setRoleCreating(true);
    try {
      await RoleApi.createRole({ names });
      getData(search, currentPage, isDeleted);
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
      getData(search, currentPage, isDeleted);
    } catch (error) {
      message.error("Failed to update role status");
      console.error("Failed to update role status: ", error);
    }
  };

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    router.push(`?search=${value}`);
    getData(value, 1, isDeleted);
  };

  const onPageChange = (current: number) => {
    setCurrentPage(current);
    getData(search, current, isDeleted);
  };

  const handleChange = (value: boolean) => {
    setIsDeleted(value);
    getData(search, 1, value);
  };

  useEffect(() => {
    getData(search, currentPage, isDeleted);
  }, [isDeleted]);

  const columns: ColumnType<Role>[] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (_, record, index) => (
        <span>{index + 1 + (currentPage - 1) * PageSize.ROLE_LIST}</span>
      ),
    },
    {
      title: "Role name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      width: "40%",
      render: (permissions: Permission[]) => (
        <div>
          {permissions.length > 0 ? (
            permissions
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((permission) => (
                <Tag key={permission.id} color="blue" style={{ margin: 5 }}>
                  {permission.name}
                </Tag>
              ))
          ) : (
            <span>No permissions assigned</span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isDisabled",
      key: "isDisabled",
      render: (isDisabled: boolean) => (
        <span
          style={{
            color: isDisabled ? "#FF0000" : "#29CB00",
            fontWeight: "bold",
          }}
        >
          {isDisabled ? "Disabled" : "In use"}
        </span>
      ),
      sorter: (a, b) => Number(a.isDisabled) - Number(b.isDisabled),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Dropdown menu={{ items: getActionItems(record) }}>
    //       <Button icon={<More size={24} />} />
    //     </Dropdown>
    //   ),
    // },
  ];

  if (canAccessUpdateRole || canAccessDisableRole) {
    columns.push({
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }}>
          <Button icon={<More size={24} />} />
        </Dropdown>
      ),
    });
  }

  const getActionItems = (record: Role): MenuProps["items"] => {
    const { isDisabled, id, name, permissions } = record;

    const items: MenuProps["items"] = [];

    if (canAccessUpdateRole) {
      items.push({
        key: "UPDATE_ROLE",
        label: "Update role",
        icon: <User size="16" />,
        onClick: () => {
          setSelectedRole({ id, name });
          setShowUpdateRoleNameModal(true);
        },
      });
    }

    if (canAccessUpdateRole) {
      items.push({
        key: "ASSIGN_PERMISSION",
        label:
          permissions!.length === 0
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
      });
    }

    if (canAccessDisableRole) {
      items.push({
        key: "SET_STATUS",
        label: isDisabled ? "Enable role" : "Disable role",
        danger: !isDisabled,
        icon: isDisabled ? <Unlock /> : <Forbid />,
        onClick: () => {
          confirm({
            title: isDisabled
              ? "Do you want to enable this role?"
              : "Do you want to disable this role?",
            onOk: () => updateRoleStatus(id, !isDisabled),
          });
        },
      });
    }

    return items;
  };

  return (
    <div>
      <BaseTable
        rowKey="id"
        title="Role management"
        loading={loading}
        dataSource={roles.data.map((role) => ({
          ...role,
          key: role.id,
          permissions: role.permissions || [],
        }))}
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
          canAccessCreateRole ? ( // Check for create permission
            <Button
              type="primary"
              onClick={() => setShowItemModal(true)}
              loading={roleCreating}
            >
              Create Role
            </Button>
          ) : null
        }
        actions={
          <Col>
            <span className="mr-2">Status: </span>
            <Select
              allowClear
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "false", label: "In use" },
                { value: "true", label: "Disabled" },
              ]}
            />
          </Col>
        }
      />
      <RoleUpdateModal
        onCancel={() => setShowUpdateRoleNameModal(false)}
        onSuccess={() => getData("", currentPage, isDeleted)}
        open={showUpdateRoleNameModal}
        data={selectedRole}
      />
      <RoleModal
        onCancel={() => setShowItemModal(false)}
        onSuccess={() => getData("", currentPage, isDeleted)}
        open={showItemModal}
      />
      <RolePermissionModal
        onCancel={() => setAssignPermissionModal(false)}
        onSuccess={() => getData("", currentPage, isDeleted)}
        open={assignPermissionModal}
        data={selectedRole}
      ></RolePermissionModal>
    </div>
  );
};

export default withPermission(RoleManagementList, "role_view");
