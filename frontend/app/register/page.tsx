"use client";

import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  height: 80vh;
  background-color: #fff;
`;

const RegisterFormWrapper = styled.div`
  filter: drop-shadow(0 0 1.25rem rgba(0, 0, 0, 0.16));
  width: clamp(20rem, min(40%, 32vw), 36rem);
`;

const formItemLayout = {
  labelCol: {
    sm: { span: 7 },
  },
};

const { Title } = Typography;

export const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(1);
  const router = useRouter();

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    router.back();
  };

  return (
    <Container>
      <RegisterFormWrapper>
        <Card bordered={true}>
          <Title level={2} className="mb-1" style={{ marginBottom: 30 }}>
            Register an account
          </Title>

          <Form
            {...formItemLayout}
            // layout="vertical"
            initialValues={{
              gender: 1,
              dob: dayjs(), 
            }}
            onFinish={async (values: any) => {
              console.log("data: ", values);
              const { phone, password } = values;
              // await handleLogin(phone, password);
              // navigate(routes.root);
            }}
          >
            <Form.Item
              name="name"
              labelAlign="left"
              label="Full name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  pattern: /^[a-zA-Z0-9]*$/,
                  message: "No special characters allowed!",
                },
              ]}
            >
              <Input placeholder="Input your full name..." size="large" />
            </Form.Item>
            <Form.Item
              name="phone"
              labelAlign="left"
              label="Phone number"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message:
                    "Phone number must be 10 digits long and contain only numbers!",
                },
              ]}
            >
              <Input placeholder="Input your phone number..." size="large" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              labelAlign="left"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
              ]}
            >
              <Input placeholder="Input your email..." size="large" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              labelAlign="left"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your gender!",
                },
              ]}
            >
              <Radio.Group onChange={onChangeRadio} value={value}>
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
                <Radio value={3}>Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="dob"
              label="Date of birth"
              labelAlign="left"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <DatePicker
                size="large"
                format={{
                  format: "DD-MM-YYYY",
                  type: "mask",
                }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
                onChange={onChangeDate}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Input your password..."
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm password"
              labelAlign="left"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Input your confirm password..."
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between">
                <Button
                  type="default"
                  size="large"
                  style={{ width: "48%" }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ width: "48%" }}
                  loading={loading}
                >
                  Register
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </RegisterFormWrapper>
    </Container>
  );
};

export default RegisterPage;
