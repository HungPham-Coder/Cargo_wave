import React, { useState, useEffect } from "react";
import RoleApi from "../../apis/roles"; // Assuming this is your API handler
import { Form, Input, message, Transfer, TransferProps } from "antd";
import BaseModal from "../baseModal";
import PermissionSelect from "./permissionSelect";
import PermissionApi from "@/source/apis/permissions";
import { PageSize } from "@/source/constants/app";
import { useRouter, useSearchParams } from "next/navigation";

interface RolePermissionModalProps {
  data?: { id?: string; name?: string; permissions?: string[] };
  onCancel: () => void;
  onSuccess: () => void;
  open: boolean;
}
interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionsResponse {
  data: Permission[];
  total: number;
}

const RolePermissionModal: React.FC<RolePermissionModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
  const [permissions, setPermissions] = useState<PermissionsResponse>({
    data: [],
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
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
      const response: PermissionsResponse =
        await PermissionApi.findAllWithPaging(
          search!,
          pageIndex! - 1,
          PageSize.PERMISSION_LIST
        );
      setPermissions(response);
      console.log("Permissions: ", response.data)

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

  useEffect(() => {
    console.log("Data received in useEffect:", data); // Check if permissions are available
    if (data && open && data.permissions) {
      setSelectedItems(data.permissions || []);
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        permissions: data.permissions || [],
      });
    }
    getData();
  }, [data, open, form]);

  const handleAssignPermissionToRole = async (values: any) => {
    setLoading(true);
    const roleId = values.id; // Explicitly get roleId from form values
    const permissionIDs = selectedItems; // Selected permission IDs (array of strings)
    console.log("permissionIDs: ", permissionIDs);

    try {
      // Here, pass both roleId and permissionIDs as separate arguments
      const body = await RoleApi.assignPermissionsToRole(roleId, permissionIDs);
      if (body) {
        message.success(`Assigned permissions successfully`);
        form.resetFields();
        onSuccess();
      } else {
        message.error(`Failed to update role permissions`);
      }
    } catch (error) {
      message.error(`An error occurred while updating the role`);
      console.error("Error updating role permissions:", error);
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  const handleChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const onPageChange = (current: number) => {
    setCurrentPage(current);
    getData(search, current, false);
  };

  return (
    <BaseModal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      title="Assign permission to role"
      confirmLoading={loading}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAssignPermissionToRole}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="permissions" label="Select Permissions">
          <PermissionSelect
            value={selectedItems} // Set value to selectedItems
            onChange={(value: any) => {
              console.log("PermissionSelect value: ", value);
              setSelectedItems(value || []); // Update selectedItems when permissions change
            }}
          />
        </Form.Item>
      </Form>
      <Transfer
        dataSource={permissions.data}
        onChange={handleChange}
        render={(item) => item.name}
        pagination={{
          pageSize: PageSize.ROLE_LIST,
        }}
        targetKeys={targetKeys}
  
      />
    </BaseModal>
  );
};

export default RolePermissionModal;
