import React, { useState } from "react";
import RoleApi from "../../apis/roles";
import { Button, Form, Input, message, Space } from "antd";
import BaseModal from "../baseModal";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface RoleModalProps {
  data?: {
    id?: string;
    name?: string;
  };
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const RoleModal: React.FC<RoleModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const isCreate = !data;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Transform the form values to the desired format
  const handleRole = async (values: any) => {
    setLoading(true);

    const body = {
      ...values,
      names: values.names.map((item: { role: string }) => item.role),
    };
    const success = await RoleApi.createRole(body);
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
      title={`Create role name`}
      confirmLoading={loading}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          id: data?.id,
          names: data?.name ? [{ role: data.name }] : [{ role: "" }],
        }}
        onFinish={handleRole}
      >
        {!isCreate && (
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.List name="names" initialValue={[{ role: "" }]}>
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
                    name={[name, "role"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input role name or delete this field!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Input role name"
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

export default RoleModal;
