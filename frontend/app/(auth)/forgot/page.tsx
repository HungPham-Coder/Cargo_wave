"use client";

import React from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons"; // Import ArrowLeftOutlined
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter(); // Initialize router

  const schema = yup
    .object({
      email: yup.string().required("Please enter your email"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = (data: any) => {
    console.log("Form data:", data);
  };

  // Function to navigate back to login page
  const handleBack = () => {
    router.push("/login"); // Change to your login route
  };

  return (
    <Flex justify="center" style={{ marginTop: 50 }}>
      <Form
        layout={"vertical"}
        initialValues={{ remember: true }}
        style={{
          borderRadius: "1rem",
          backgroundColor: "pink",
          padding: "0 20px",
        }}
        onFinish={handleSubmit(onFinish)}
      >
        <Title
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#000",
            marginBottom: 0,
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            style={{
              background: "white",
              padding: 0,
              marginRight: "8px",
            }}
          />
          Forgot Password
        </Title>

        <Paragraph
          style={{
            fontSize: "18px",
            marginTop: "0.9rem",
          }}
        >
          Please enter the email linked to your account.
        </Paragraph>

        <Form.Item
          style={{
            paddingBottom: errors.email ? "1rem" : 0,
            marginTop: "2.7rem",
          }}
          help={
            errors.email && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>
                {errors.email?.message}
              </span>
            )
          }
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id="username"
                placeholder={"Enter your email!"}
                prefix={
                  <UserOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />
                }
                style={{
                  borderRadius: "0.5rem",
                  background: "white",
                  fontSize: "16px",
                }}
                {...field}
                size="large"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="middle">
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ForgotPasswordPage;
