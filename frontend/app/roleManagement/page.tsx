"use client";

import RoleApi from "@/source/apis/roles";
import { BaseTable } from "@/source/components/baseTable";
import RoleModal from "@/source/components/roleModal";
import RoleUpdateModal from "@/source/components/roleUpdateModal";
import { PageSize } from "@/source/constants/app";
import { Forbid, More, Unlock, User } from "@icon-park/react";
import { Button, Dropdown, MenuProps, message, Space } from "antd";
import confirm from "antd/es/modal/confirm";
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

interface Role {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface RolesResponse {
  data: Role[];
  total: number;
}

const RoleManagementList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<RolesResponse>({ data: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const defaultPage = 1;
  const [showItemModal, setShowItemModal] = useState(false);
  const [roleCreating, setRoleCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateRoleNameModal, setShowUpdateRoleNameModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    { id?: string; name?: string; isDeleted?: boolean } | undefined
  >();

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

  const handleCreateRoles = async (names: string[]) => {
    setRoleCreating(true);
    try {
      await RoleApi.createRole({ names });
      getData(searchTerm, currentPage, true);
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
    setSearchTerm(value);
    getData(value, defaultPage, true);
  };

  const onPageChange = (current: number) => {
    setCurrentPage(current);
    getData(undefined, current, false);
  };

  useEffect(() => {
    getData(undefined, defaultPage, true);
  }, []);

  const columns: ColumnType<{
    key: string;
    name: string;
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
      width: "60%",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
  }): MenuProps["items"] => {
    const { isDisabled, id } = record;

    return [
      {
        key: "UPDATE_ROLE",
        label: "Update role",
        icon: <User />,
        onClick: () => {
          setSelectedRole({ id, name: record.name });
          setShowUpdateRoleNameModal(true);
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
    <div style={{ paddingLeft: 30, paddingRight: 30, display: "flex", justifyContent: "center"}}>
      <Space direction="vertical" className="w-full gap-6" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            className="btn-primary app-bg-primary font-semibold text-white"
            onClick={() => setShowItemModal(true)}
          >
            Create role
          </Button>
        </div>

        <BaseTable
          rowKey="id"
          title="Role management"
          loading={loading}
          dataSource={
            roles?.data?.map((role) => ({
              ...role,
              key: role.id,
            })) || []
          }
          columns={columns}
          pagination={{
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
        />
      </Space>
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
    </div>
  );
};

export default RoleManagementList;
