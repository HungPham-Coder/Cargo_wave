"use client"

import React from 'react';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";

const { Title } = Typography;

const ResetPasswordPage: React.FC = () => {
    const schema = yup
        .object({
            password: yup
                .string()
                .required("Please enter your password"),
            repassword: yup
                .string()
                .oneOf([yup.ref("password")], "Confirm password must match password")
                .required("Please enter your confirm password!"),
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

    return (
        <Flex justify="center" align="center" style={{ minHeight: "100vh", width: "100vw" }}>
            <Form
                layout={'vertical'}
                initialValues={{ remember: true }}
                style={{
                    borderRadius: "1rem",
                    backgroundColor: "pink",
                    padding: "0 20px"
                }}
                onFinish={handleSubmit(onFinish)}
            >
                <Title style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#000",
                    marginBottom: 0
                }}>New Password
                </Title>

                <Paragraph style={{
                    fontSize: "18px",
                    marginTop: "0.9rem"
                }}>Please enter new password for your account.</Paragraph>

                <Form.Item
                    label="New Password"
                    style={{
                        paddingBottom: errors.password ? "1rem" : 0,
                    }}
                    help={
                        errors.password && (
                            <span style={{ color: "red", fontSize: "0.9rem" }}>
                                {errors.password?.message}
                            </span>
                        )
                    }
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id='password'
                                placeholder={"Enter your password!"}
                                prefix={<UserOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                                style={{
                                    borderRadius: "0.5rem",
                                    background: "white",
                                    fontSize: "16px",
                                }}
                                {...field}
                                size='large'
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    style={{
                        paddingBottom: errors.repassword ? "1rem" : 0,
                    }}
                    help={
                        errors.repassword && (
                            <span style={{ color: "red", fontSize: "0.9rem" }}>
                                {errors.repassword?.message}
                            </span>
                        )
                    }
                >
                    <Controller
                        name="repassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id='repassword'
                                placeholder={"Enter your confirm password!"}
                                prefix={<UserOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                                style={{
                                    borderRadius: "0.5rem",
                                    background: "white",
                                    fontSize: "16px",
                                }}
                                {...field}
                                size='large'
                            />
                        )}
                    />
                </Form.Item>
                <Form.Item>
                    <Flex justify='flex-end'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size='large'
                        >
                            Submit
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default ResetPasswordPage;