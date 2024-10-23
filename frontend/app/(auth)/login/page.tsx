"use client";

import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  message,
  Row,
  Typography,
} from "antd";
import styled from "styled-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import routes from "@/source/router/routes";
import AuthApi from "@/source/apis/auth";
import Card from "antd/es/card/Card";
import { useRouter } from "next/navigation";
import { useLocation } from 'react-router-dom';

const { Title } = Typography;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
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


const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const handleGoogle = async () => {
    setLoading(true);
    const success = await AuthApi.loginGoogle();
    setLoading(false);
    if (success) {
      message.success(`Login by Google successful!`);
      // // router.push(routes.root); // Navigate to root route
      setTimeout(() => {
        window.location.href = routes.rootFromGG(success); // Set timeout to reload to home page
      }, 5);
    } else {
      message.error("Wrong email. Please try again!");
    }
  }
  const handleLogin = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    const success = await AuthApi.login(email, password);
    setLoading(false);
    if (success) {
      message.success(`Login successful!`);

      // router.push(routes.root); // Navigate to root route
      setTimeout(() => {
        window.location.href = routes.root; // Set timeout to reload to home page
      }, 0);
    } else {
      message.error("Wrong username or password. Please try again!");
    }
  };

  return (
    <Container>
      <LoginFormWrapper>
        <Card bordered={true}>
          <ImageWrapper>
            <img src="/assets/CARGO WAVE.png" width={300} alt="Logo" />
          </ImageWrapper>

          <Title level={2}>Login</Title>

          <Form
            layout="vertical"
            onFinish={async (values: any) => {
              console.log("data: ", values);
              const { email, password } = values;
              await handleLogin(email, password);

            }}
          >
            <Form.Item
              name="email"
              labelAlign="right"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email..."
                size="large"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password..."
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
            <Row justify="center">
              <Button type="link" className="custom-link">
                <Link href={routes.register}>Register account</Link>
              </Button>
              <Button type="link" className="custom-link">
                <Link href={routes.forgotPassword}>Forgot password?</Link>
              </Button>
            </Row>
            <Row>
              <Divider
                plain
                style={{ borderColor: "#D4D4D4", color: "#D4D4D4" }}
              >
                Or login with
              </Divider>
            </Row>
            <Row justify="center">
              <Button shape="circle" onClick={handleGoogle}>
                <Avatar
                  style={{ background: "white" }}
                  src={<img src="assets/google_logo_icon.png" />}
                />
              </Button>
            </Row>
          </Form>
        </Card>
      </LoginFormWrapper>
    </Container>
  );
};

export default LoginPage;
