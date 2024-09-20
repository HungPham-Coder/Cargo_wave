"use client";

import PermissionApi from "@/source/apis/permissions";
import permissionApi from "@/source/apis/permissions";
import { BaseTable } from "@/source/components/baseTable";
import PermissionModal from "@/source/components/permissionModal";
import PermissionUpdateModal from "@/source/components/permissionUpdateModal";
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

interface permission {
  id: string;
  name: string;
  isDisabled: boolean;
}

interface permissionsResponse {
  data: permission[];
  total: number;
}

const PermissionManagementList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<permissionsResponse>({ data: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const defaultPage = 1;
  const [showItemModal, setShowItemModal] = useState(false);
  const [permissionCreating, setPermissionCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdatePermissionNameModal, setShowUpdatePermissionNameModal] = useState(false);
  const [selectedpermission, setSelectedpermission] = useState<
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
      const response: permissionsResponse = await PermissionApi.findAllWithPaging(
        search!,
        pageIndex! - 1,
        PageSize.PERMISSION_LIST
      );
      setPermissions(response);
    } catch (error) {
      message.error("Failed to fetch permissions");
      console.error("Failed to fetch permissions: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatepermissions = async (names: string[]) => {
    setPermissionCreating(true);
    try {
      await PermissionApi.createPermission({ names });
      getData(searchTerm, currentPage, true);
    } catch (error) {
      message.error("Failed to create permissions");
      console.error("Failed to create permissions: ", error);
    } finally {
      setPermissionCreating(false);
    }
  };

  const updatepermissionStatus = async (permissionID: string, isDisabled: boolean) => {
    try {
      await PermissionApi.updatePermissionStatus(permissionID, isDisabled);
      message.success("permission status updated successfully");
      // Refresh list with current search term and page
      getData(searchTerm, currentPage, true);
    } catch (error) {
      message.error("Failed to update permission status");
      console.error("Failed to update permission status: ", error);
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
          <span>{index + 1 + (currentPage - 1) * PageSize.PERMISSION_LIST}</span>
        );
      },
    },
    {
      title: "Permission name",
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
        placeholder: "permission status",
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
        key: "UPDATE_permission",
        label: "Update permission",
        icon: <User />,
        onClick: () => {
          setSelectedpermission({ id, name: record.name });
          setShowUpdatePermissionNameModal(true);
        },
      },
      {
        key: "SET_STATUS",
        label: isDisabled ? "Enable permission" : "Disable permission",
        danger: !isDisabled,
        icon: isDisabled ? <Unlock /> : <Forbid />,
        onClick: () => {
          confirm({
            title: isDisabled
              ? "Do you want to enable permission?"
              : "Do you want to disable permission?",
            type: "confirm",
            cancelText: "Cancel",
            onOk: () => updatepermissionStatus(id, !isDisabled),
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
            Create permission
          </Button>
        </div>

        <BaseTable
          rowKey="id"
          title="permission management"
          loading={loading}
          dataSource={
            permissions?.data?.map((permission) => ({
              ...permission,
              key: permission.id,
            })) || []
          }
          columns={columns}
          pagination={{
            onChange: onPageChange,
            pageSize: PageSize.PERMISSION_LIST,
            total: permissions.total,
          }}
          searchOptions={{
            visible: true,
            placeholder: "Search permissions...",
            onSearch: handleSearch,
            width: 300,
          }}
        />
      </Space>
      <PermissionUpdateModal
        onCancel={() => setShowUpdatePermissionNameModal(false)}
        onSuccess={() => getData(undefined, defaultPage, true)}
        open={showUpdatePermissionNameModal}
        data={selectedpermission}
      />
      <PermissionModal
        onCancel={() => setShowItemModal(false)}
        onSuccess={() => getData(undefined, defaultPage, true)}
        open={showItemModal}
        data={undefined}
      />
    </div>
  );
};

export default PermissionManagementList;
