"use client"

import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, message, Typography } from 'antd';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import AuthApi from '@/source/apis/auth';
import routes from '@/source/router/routes';
import { useParams } from 'next/navigation';

const { Title } = Typography;

const ResetPasswordPage: React.FC = () => {
    const {id} = useParams();
    console.log("id: ", id);
    
    const [loading, setLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);

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
        handleResetPassword(data.password, id.toString());
    };

    const handleResetPassword = async (newPassword: string, id: any): Promise<any> => {
        setLoading(true);
        const success = await AuthApi.resetPassword(newPassword, id);
        setLoading(false);
        if (success) {
            message.success(`New password is reseted`);

            // router.push(routes.root); // Navigate to root route
            setTimeout(() => {
                window.location.href = routes.login; // Set timeout to reload to home page
            }, 10);
        } else {
            message.error("Wrong request forgot password. Please try again!");
        }
    }

    useEffect(() => {
        const checkToken = async () => {
            const success = await AuthApi.checkToken(id); // Kiểm tra token bằng id
            setIsTokenValid(success);
        };
        checkToken();
    }, [id]);

    if (!isTokenValid) {
        return <h2>Token không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.</h2>;
    }
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