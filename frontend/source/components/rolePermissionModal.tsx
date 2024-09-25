import React, { useState, useEffect } from "react";
import RoleApi from "../apis/roles"; // Assuming this is your API handler
import { Form, Input, message } from "antd";
import BaseModal from "./baseModal";
import { PermissionSelect } from "./permissionSelect";

interface RolePermissionModalProps {
  data?: { id?: string; name?: string; permissions?: string[] };
  onCancel: () => void;
  onSuccess: () => void;
  open: boolean;
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
            onChange={(value) => {
              console.log("PermissionSelect value: ", value);
              setSelectedItems(value || []); // Update selectedItems when permissions change
            }}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
};

export default RolePermissionModal;
