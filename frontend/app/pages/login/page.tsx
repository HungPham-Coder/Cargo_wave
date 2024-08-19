'use client';

import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
// import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import routes from "@/component/router/routes";
import AuthApi from "@/component/apis/auth";
import Card from "antd/es/card/Card";

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

const LoginFormWrapper = styled.div`
  filter: drop-shadow(0 0 1.25rem rgba(0, 0, 0, 0.16));
  width: clamp(20rem, min(40%, 32vw), 36rem);
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // const handleLogin = async (
  //   phone: string,
  //   password: string
  // ): Promise<void> => {
  //   setLoading(true);
  //   const success = await AuthApi.login(phone, password);
  //   setLoading(false);
  //   if (success) {
  //     message.success(`Đăng nhập thành công!`);
  //     // navigate(routes.root);
  //   } else {
  //     message.error("Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại.");
  //   }
  // };

  return (
    <Container>
      <LoginFormWrapper>
        <Card bordered={true}>
          <ImageWrapper>
            <img src="/assets/CARGO WAVE.png" width={300} alt="Logo" />
          </ImageWrapper>

          <Title level={2} className="!mb-1">
            Đăng nhập
          </Title>

          <Form
            layout="vertical"
            onFinish={async (values: any) => {
              console.log("data: ", values);
              // const { phone, password } = values;
              // await handleLogin(phone, password);
            }}
          >
            <Form.Item
              name="phone"
              labelAlign="right"
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
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập số điện thoại của bạn..."
                size="large"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu của bạn..."
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
                Đăng nhập
              </Button>
            </Form.Item>
            <Row justify="center">
              <Button type="link">
                <Link href={routes.register}>Đăng ký tài khoản</Link>
              </Button>
              <Button type="link">
                <Link href={routes.forgotPassword}>Quên mật khẩu?</Link>
              </Button>
            </Row>
            <Row>
              <Divider
                plain
                variant="solid"
                style={{ borderColor: "#D4D4D4", color: "#D4D4D4" }}
              >
                Or login with
              </Divider>
            </Row>
            <Row justify="center">
              <Button shape="circle">
                <Avatar src={<img src="assets/google_logo_icon.png" />} />
              </Button>
            </Row>
          </Form>
        </Card>
      </LoginFormWrapper>
    </Container>
  );
};

export default LoginPage;