"use client";

import {
  CameraOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Tag,
  Typography,
  Upload,
} from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import dayjs from "dayjs";
import { useState } from "react";
import type { SelectProps } from "antd";
import { useRouter } from "next/navigation";
import routes from "@/source/router/routes";
import Link from "next/link";

const { Title } = Typography;

const roleColors: { [key: string]: string } = {
  admin: "red",
  user: "blue",
  moderator: "green",
};

// Define tagRender function
const tagRender: SelectProps["tagRender"] = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={roleColors[value]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const router = useRouter(); // Get the router instance

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Received values: ", values);
    setTimeout(() => {
      setLoading(false);
      message.success("Profile updated successfully!");
    }, 1000);
  };

  const handleUpload = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      // Set the uploaded image as the avatar preview
      setImageUrl(URL.createObjectURL(info.file.originFileObj as RcFile));
      message.success(`${info.file.name} file uploaded successfully.`);
    }
  };

  return (
    <div>
      <Breadcrumb style={{ margin: "16px 16px" }}>
        <Breadcrumb.Item>
          <Link href={routes.root}>
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={routes.profile}>Profile</Link>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>{id}</Breadcrumb.Item> */}
      </Breadcrumb>
      <Title ellipsis level={3} style={{ marginLeft: 16 }}>
        Profile management
      </Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "40%",
            padding: "20px",
            border: "4px solid #F1F1F1",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <Avatar size={100} src={imageUrl} icon={<UserOutlined />} />

            {/* Camera icon in bottom-right of the avatar */}
            <Upload
              name="avatar"
              showUploadList={false}
              action="/upload" // Simulated upload URL
              onChange={handleUpload}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: -10, // Adjust for positioning below avatar
                  right: "41%", // Adjust for positioning to the right of avatar
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  padding: "4px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CameraOutlined style={{ fontSize: 20 }} />
              </div>
            </Upload>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: "John Doe",
              email: "johndoe@example.com",
              phone: "123-456-7890",
              dob: dayjs("1990-01-01"),
              gender: "male",
              roles: ["user"],
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select placeholder="Select Gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Roles"
              name="roles"
              rules={[
                { required: true, message: "Please select at least one role!" },
              ]}
            >
              <Select
                mode="multiple"
                tagRender={tagRender}
                placeholder="Select Roles"
                style={{ width: "100%" }}
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="moderator">Moderator</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                block
                loading={loading}
                style={{
                  padding: "20px 20px", 
                  fontSize: "16px",
                }}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
