"use client";

import { useSearchParams, useRouter } from "next/navigation";
import PermissionApi from "@/source/apis/permissions";
import { BaseTable } from "@/source/components/baseTable";
import PermissionModal from "@/source/components/modal/permissionModal";
import PermissionUpdateModal from "@/source/components/modal/permissionUpdateModal";
import { PageSize } from "@/source/constants/app";
import { User } from "@icon-park/react";
import { MenuProps, message } from "antd";
import { useEffect, useState } from "react";
import withPermission from "@/source/components/withPermission";

interface ColumnType<T> {
  title: string;
  dataIndex: keyof T | "index" | "action";
  key: string;
  width?: string;
  render?: (text: any, record: T, index: number) => JSX.Element;
  sorter?: (a: T, b: T) => number;
}

interface permission {
  id: string;
  name: string;
  description: string;
}

interface permissionsResponse {
  data: permission[];
  total: number;
}

const PermissionManagementList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<permissionsResponse>({
    data: [],
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const defaultPage = 1;
  const [showItemModal, setShowItemModal] = useState(false);
  const [permissionCreating, setPermissionCreating] = useState(false);
  const [showUpdatePermissionNameModal, setShowUpdatePermissionNameModal] =
    useState(false);
  const [selectedpermission, setSelectedpermission] = useState<
    { id?: string; name?: string; description?: string } | undefined
  >();

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
      console.log("Fetching data with params:", {
        search,
        pageIndex,
        pageSize: PageSize.ROLE_LIST,
      });
      const response: permissionsResponse =
        await PermissionApi.findAllWithPaging(
          search!,
          pageIndex! - 1,
          PageSize.PERMISSION_LIST
        );
      setPermissions(response);

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

  const handleCreatePermissions = async (names: string[]) => {
    setPermissionCreating(true);
    try {
      await PermissionApi.createPermission({ names });
      getData(search, currentPage, true); 
    } catch (error) {
      message.error("Failed to create permissions");
      console.error("Failed to create permissions: ", error);
    } finally {
      setPermissionCreating(false);
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
    description: string;
  }>[] = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (_, record, index) => {
        return (
          <span>
            {index + 1 + (currentPage - 1) * PageSize.PERMISSION_LIST}
          </span>
        );
      },
    },
    {
      title: "Permission name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "50%",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, record: any) => (
    //     <Dropdown menu={{ items: getActionItems(record) }}>
    //       <Button icon={<More />} />
    //     </Dropdown>
    //   ),
    // },
  ];

  const getActionItems = (record: {
    description: string;
    id: string;
    name: string;
  }): MenuProps["items"] => {
    const { id, name, description } = record;

    return [
      {
        key: "UPDATE_permission",
        label: "Update permission",
        icon: <User />,
        onClick: () => {
          setSelectedpermission({ id, name, description });
          setShowUpdatePermissionNameModal(true);
        },
      },
    ];
  };

  return (
      <div>
        <BaseTable
          rowKey="id"
          title="Permission list"
          loading={loading}
          dataSource={
            permissions?.data?.map((permission) => ({
              key: permission.id,
              ...permission,
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
          // addButton={
          //   <Button
          //     type="primary"
          //     className="btn-primary app-bg-primary font-semibold text-white"
          //     onClick={() => setShowItemModal(true)}
          //   >
          //     Create permission
          //   </Button>
          // }
        />
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

export default withPermission(PermissionManagementList, 'permission_view');
