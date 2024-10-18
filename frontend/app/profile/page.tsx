"use client";
import UserApi from "@/source/apis/users";
import withPermission from "@/source/components/withPermission";
import { UserContext } from "@/source/contexts/UserContext";
import routes from "@/source/router/routes";
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
  Radio,
  RadioChangeEvent,
  Select,
  SelectProps,
  Tag,
  Typography,
  Upload,
} from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import dayjs from "dayjs";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [value, setValue] = useState(1);
  const [users, setUsers] = useState();
  const [userId, setUserId] = useState("");
  const [resource, setResource] = useState<
    string | CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const { user, setUser, setSavedUser} = useContext(UserContext);

  console.log("avatarUrl", avatarUrl);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await UserApi.findById(userId);
      console.log("response", response);
      setUsers(response);
      form.setFieldsValue({
        name: response.name,
        phone_number: response.phone_number,
        email: response.email,
        gender: response.gender,
        image: response.image,
        dob: dayjs(response.dob),
      });
      setAvatarUrl(response.image);
    } catch (error) {
      message.error("Failed to fetch roles");
      console.error("Failed to fetch roles: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserProfile = async (id: string, values: any) => {
    setLoading(true);
    try {
      const updatedValues = {
        ...values,
        image: avatarUrl, // Include the image URL in the payload
      };

      const body = await UserApi.updateUser(id, updatedValues);

      if (body) {
        message.success(`Profile updated successfully`);
        localStorage.setItem("user", JSON.stringify(body));
        const savedUser = localStorage.getItem("user");
        if (savedUser && setSavedUser) {
          setSavedUser(JSON.parse(savedUser));
        }
        console.log("body", body);
      } else {
        message.error(`Failed to update profile`);
      }
    } catch (error) {
      message.error(`An error occurred while updating profile`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resource && typeof resource !== "string") {
      setAvatarUrl(resource.url); // Set avatar URL when resource is updated
    }
  }, [resource]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData!);
    const userId = user.id;
    setUserId(userId);
    getData();
  }, [userId]);

  const onFinish = (values: any) => {
    console.log("Received values: ", values);
    handleUpdateUserProfile(userId, values);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
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
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="image">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <Avatar size={100} src={avatarUrl} icon={<UserOutlined />} />

                <CldUploadWidget
                  uploadPreset="cargo_wave_upload"
                  onSuccess={(result, { widget }) => {
                    setResource(result?.info);
                  }}
                  onQueuesEnd={(result, { widget }) => {
                    widget.close();
                  }}
                >
                  {({ open }) => (
                    <div
                      style={{
                        position: "absolute",
                        bottom: -10,
                        right: "41%",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        padding: "4px",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => open()}
                    >
                      <CameraOutlined style={{ fontSize: 20 }} />
                    </div>
                  )}
                </CldUploadWidget>
              </div>
            </Form.Item>

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
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "No special characters allowed!",
                },
              ]}
            >
              <Input placeholder="Input your full name..." size="large" />
            </Form.Item>

            <Form.Item
              name="phone_number"
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
              <Radio.Group
                onChange={onChangeRadio}
                value={value}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly", // Centers the radio group horizontally
                }}
              >
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
                style={{ width: "100%" }}
                size="large"
                format={{
                  format: "DD-MM-YYYY",
                  type: "mask",
                }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                block
                loading={loading}
                style={{ padding: "20px 20px", fontSize: "16px" }}
              >
                Update profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default withPermission(ProfilePage, "user_update");
