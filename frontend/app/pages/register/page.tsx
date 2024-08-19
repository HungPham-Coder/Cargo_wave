'use client';

import {
  Avatar,
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import routes from "../../../component/router/routes";

const Container = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  width: 100%;
  height: 100vh;
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
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(1);

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Container>
      <RegisterFormWrapper>
        <Card bordered={true}>
          <Title level={2} className="!mb-1" style={{marginBottom: 30}}>
            Register an account
          </Title>

          <Form
            {...formItemLayout}
            // layout="vertical"
            onFinish={async (values: any) => {
              console.log("data: ", values);
              // const { phone, password } = values;
              // await handleLogin(phone, password);
              // navigate(routes.root);
            }}
          >
            <Form.Item
              name="name"
              labelAlign="left"
              label="Full name"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              //   {
              //     pattern: /^[a-zA-Z0-9]*$/,
              //     message: "No special characters allowed!",
              //   },
              // ]}
            >
              <Input placeholder="Input your full name..." size="large" />
            </Form.Item>
            <Form.Item
              name="phone"
              labelAlign="left"
              label="Phone number"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              //   {
              //     pattern: /^[a-zA-Z0-9]*$/,
              //     message: "No special characters allowed!",
              //   },
              // ]}
            >
              <Input placeholder="Input your phone number..." size="large" />
            </Form.Item>
            <Form.Item name="email" label="Email" labelAlign="left">
              <Input placeholder="Input your email..." size="large" />
            </Form.Item>
            <Form.Item name="gender" label="Gender" labelAlign="left">
              <Radio.Group onChange={onChangeRadio} value={value} >
                <Radio value={1} className="mr-4">Male</Radio>
                <Radio value={2} className="mr-4">Female</Radio>
                <Radio value={3} className="mr-4">Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="dob" label="Date of birth" labelAlign="left">
              <DatePicker
                size="large"
                format={{
                  format: "DD-MM-YYYY",
                  type: "mask",
                }}
                onChange={onChangeDate}
              />
            </Form.Item>
            <Form.Item name="password" label="Password" labelAlign="left">
              <Input.Password
                placeholder="Input your password..."
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm password"
              labelAlign="left"
            >
              <Input.Password
                placeholder="Input your confirm password..."
                size="large"
              />
            </Form.Item>
            <Form.Item name="login-button">
              <Button
                className="w-full btn-primary app-bg-primary font-semibold"
                size="large"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </RegisterFormWrapper>
    </Container>
  );
};

export default RegisterPage;