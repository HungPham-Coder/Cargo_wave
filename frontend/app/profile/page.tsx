import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import { useState } from "react";

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleFinish = (values: any) => {
    // Handle form submission, e.g., send data to an API
    console.log('Received values:', values);
    message.success('Profile updated successfully!');
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setProfilePicture(info.file.originFileObj);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Manage Profile</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        
        <Form.Item label="Profile Picture">
          <Upload
            accept=".jpg,.jpeg,.png"
            showUploadList={false}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
