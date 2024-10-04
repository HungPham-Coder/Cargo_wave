import React, { useState, useEffect } from "react";
import RoleApi from "../../apis/roles"; // Assuming this is your API handler
import { Form, Input, message } from "antd";
import BaseModal from "../baseModal";

interface RoleUpdateModalProps {
  data?: { id?: string; name?: string };
  onCancel: () => void;
  onSuccess: () => void;
  open: boolean;
}

const RoleUpdateModal: React.FC<RoleUpdateModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Modal data:", data); // Check the values here
    if (data && open) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
      });
    }
  }, [data, open, form]);

  const handleRole = async (values: any) => {
    setLoading(true);
    const { id, name } = values;

    try {
      const body = await RoleApi.updateRoleNameByID(id, name); // Update API call

      if (body) {
        message.success(`Role updated successfully`);
        form.resetFields();
        onSuccess();
        console.log("body", body)
      } else {
        message.error(`Failed to update role`);
      }
    } catch (error) {
      message.error(`An error occurred while updating the role`);
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
      title="Update role name"
      confirmLoading={loading}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          id: data?.id || "",
          name: data?.name || "",
        }}
        onFinish={handleRole}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: "Please enter the role name" }]}
        >
          <Input placeholder="Enter role name" />
        </Form.Item>
      </Form>
    </BaseModal>
  );
};

export default RoleUpdateModal;
