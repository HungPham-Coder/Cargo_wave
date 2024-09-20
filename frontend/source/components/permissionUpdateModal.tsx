import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import BaseModal from "./baseModal";
import PermissionApi from "../apis/permissions";

interface PermissionUpdateModalProps {
  data?: { id?: string; name?: string; isDisabled?: boolean };
  onCancel: () => void;
  onSuccess: () => void;
  open: boolean;
}

const PermissionUpdateModal: React.FC<PermissionUpdateModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && open) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
      });
    }
  }, [data, open, form]);

  const handlePermission = async (values: any) => {
    setLoading(true);
    const { id, name } = values;

    try {
      const body = await PermissionApi.updatePermissionByID(id, name); // Update API call

      if (body) {
        message.success(`Permission updated successfully`);
        form.resetFields();
        onSuccess();
        console.log("body", body)
      } else {
        message.error(`Failed to update permission`);
      }
    } catch (error) {
      message.error(`An error occurred while updating the permission`);
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
      title="Update permission name"
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
        onFinish={handlePermission}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Permission Name"
          name="name"
          rules={[{ required: true, message: "Please enter the permission name" }]}
        >
          <Input placeholder="Enter permission name" />
        </Form.Item>
      </Form>
    </BaseModal>
  );
};

export default PermissionUpdateModal;
