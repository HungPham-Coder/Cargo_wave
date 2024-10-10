import React, { useState, useEffect } from "react";
import RoleApi from "../../apis/roles"; // Assuming this is your API handler
import { Form, message, Transfer, TransferProps } from "antd";
import BaseModal from "../baseModal";
import { PageSize } from "@/source/constants/app";

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
  isDisabled: boolean | null; // Assuming isDisabled can be true, false or null
}

const RolePermissionModal: React.FC<RolePermissionModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]); // Assigned permissions
  const [permissionsNotAssigned, setPermissionsNotAssigned] = useState<Permission[]>([]); // Permissions not assigned

  // Fetch assigned permissions by role ID
  const getPermissionsByRoleId = async (handleLoading?: boolean) => {
    if (handleLoading) {
      setLoading(true);
    }

    console.log("Fetching permissions for role ID:", data?.id);

    try {
      const response: Permission[] = await RoleApi.getPermissionsByRoleId(data?.id!);
      console.log("Fetched permissions:", response);
      setPermissions(response);
      setTargetKeys(response.map((permission) => permission.id));
    } catch (error) {
      message.error("Failed to fetch assigned permissions");
      console.error("Error fetching permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch permissions not assigned by role ID
  const getPermissionsNotAssignedByRoleId = async (handleLoading?: boolean) => {
    if (handleLoading) {
      setLoading(true);
    }
    try {
      const response: Permission[] = await RoleApi.getPermissionsNotAssignedByRoleId(data?.id!);
      setPermissionsNotAssigned(Array.isArray(response) ? response : []);
    } catch (error) {
      message.error("Failed to fetch unassigned permissions");
      console.error("Error fetching unassigned permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.id) {
      getPermissionsByRoleId();
      getPermissionsNotAssignedByRoleId();
    }
  }, [data?.id]);

  const handleAssignPermissionToRole = async () => {
    setLoading(true);
    const roleId = data?.id!;
    const permissionIDs = targetKeys;

    try {
      const response = await RoleApi.assignPermissionsToRole(roleId, permissionIDs);
      if (response) {
        message.success("Assigned permissions successfully");
        onSuccess();
      } else {
        message.error("Failed to update role permissions");
      }
    } catch (error) {
      message.error("An error occurred while updating the role");
      console.error("Error updating role permissions:", error);
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  const handleChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys.map((key) => String(key)));
  };

  const transferData = [
    ...permissionsNotAssigned.map((permission) => ({
      key: permission.id,
      title: permission.name,
      description: permission.description,
    })),
    ...permissions.map((permission) => ({
      key: permission.id,
      title: permission.name,
      description: permission.description,
    })),
  ];

  return (
    <BaseModal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      title={`Assign Permission to Role ${data?.name}`}
      confirmLoading={loading}
      onOk={handleAssignPermissionToRole}
    >
      <Transfer
        titles={["Not Assigned", "Assigned"]}
        dataSource={transferData}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => item.title}
        listStyle={{width: "100%"}}
      />
    </BaseModal>
  );
};

export default RolePermissionModal;
