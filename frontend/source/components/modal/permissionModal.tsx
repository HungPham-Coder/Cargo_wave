import React, { useState } from "react";
import { Button, Form, Input, message, Space } from "antd";
import BaseModal from "../baseModal";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PermissionApi from "../../apis/permissions";

interface PermissionModalProps {
  data?: {
    id?: string;
    name?: string;
  };
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const isCreate = !data;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Transform the form values to the desired format
  const handlePermission = async (values: any) => {
    setLoading(true);

    const body = {
      ...values,
      names: values.names.map((item: { permission: string }) => item.permission),
    };
    const success = await PermissionApi.createPermission(body);
    if (success) {
      message.success(`Create successful`);
      form.resetFields();
      onSuccess();
    } else {
      message.error(`Create failed`);
    }
    setLoading(false);
    success && onCancel();
  };

  return (
    <BaseModal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      title={`Create permission name`}
      confirmLoading={loading}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          id: data?.id,
          names: data?.name ? [{ permission: data.name }] : [{ permission: "" }],
        }}
        onFinish={handlePermission}
      >
        {!isCreate && (
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.List name="names" initialValue={[{ permission: "" }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", width: "100%" }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "permission"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input permission name or delete this field!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Input permission name"
                      style={{ width: 450 }}
                    />
                  </Form.Item>
                  {fields.length > 1 && ( // Ensure at least one field remains
                    <MinusCircleOutlined
                      style={{ color: "red" }}
                      onClick={() => remove(name)}
                    />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </BaseModal>
  );
};

export default PermissionModal;
