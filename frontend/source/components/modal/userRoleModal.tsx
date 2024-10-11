import React, { useState, useEffect } from "react";
import { Form, message, Transfer, TransferProps } from "antd";
import BaseModal from "../baseModal";
import UserApi from "@/source/apis/users";

interface UserRoleModalProps {
  data?: { id?: string; name?: string; permissions?: string[] };
  onCancel: () => void;
  onSuccess: () => void;
  open: boolean;
}

interface Role {
  id: string;
  name: string;
  isDisabled: boolean | null;
}

const UserRoleModal: React.FC<UserRoleModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[]>([]); // Assigned permissions
  const [rolesNotAssigned, setRolesNotAssigned] = useState<Role[]>([]); // Permissions not assigned

  console.log("Fetching permissions for role ID:", data);
  // Fetch assigned permissions by role ID
  const getRolesByUserId = async (handleLoading?: boolean) => {
    if (handleLoading) {
      setLoading(true);
    }
    try {
      const response: Role[] = await UserApi.getRolesByUserId(data?.id!);
      console.log("Fetched permissions:", response);
      setRoles(response);
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
      const response: Role[] = await UserApi.getRolesNotAssignedByUserId(data?.id!);
      setRolesNotAssigned(Array.isArray(response) ? response : []);
    } catch (error) {
      message.error("Failed to fetch unassigned permissions");
      console.error("Error fetching unassigned permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.id) {
      getRolesByUserId();
      getPermissionsNotAssignedByRoleId();
    }
  }, [data?.id]);

  const handleAssignRoleToUser = async () => {
    setLoading(true);
    const roleId = data?.id!;
    const permissionIDs = targetKeys;

    try {
      const response = await UserApi.assignPermissionsToRole(roleId, permissionIDs);
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
    ...rolesNotAssigned.map((role) => ({
      key: role.id,
      title: role.name,
    })),
    ...roles.map((role) => ({
      key: role.id,
      title: role.name,
    })),
  ];

  return (
    <BaseModal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      title={`Assign Role to ${data?.name}`}
      confirmLoading={loading}
      onOk={handleAssignRoleToUser}
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

export default UserRoleModal;
