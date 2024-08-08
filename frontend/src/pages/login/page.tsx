import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  // background-image: linear-gradient(to bottom right, #08203e, #557c93);
  background-divor: #fff;
`;

const LoginFormWrapper = styled.div`
  filter: drop-shadow(0 0 1.25rem rgba(0, 0, 0, 0.16));
  width: clamp(20rem, min(40%, 32vw), 36rem);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const LoginPage: React.FC = () => {
  // const handleNavigateRegisterPage = () => {
  //   navigate(routes.register);
  // };

  // const handleLogin = async (phone, password) => {
  //   setLoading(true);
  //   const success = await AuthApi.login(phone, password);
  //   setLoading(false);
  //   if (success) {
  //     message.success(`Đăng nhập thành công!`);
  //     navigate(routes.root);
  //   } else {
  //     message.error("Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại.");
  //   }
  // };

  return (
    <Container>
      <Row className="h-full">
        <div>
          <LoginFormWrapper>
            <Card bordered={true}>
              <Space className="w-full flex justify-between mb-6">
                <Space direction="vertical">
                  <Title level={2} className="!mb-1">
                    Đăng nhập
                  </Title>
                  {/* <Title level={5}>Chào bạn quay trở lại</Title> */}
                </Space>
                <img src={"src/assets/clt.jpg"} width={200} />
              </Space>
              <Form
                layout="vertical"
                onFinish={async (values) => {
                  console.log("data: ", values);
                  //   const { phone, password } = values;
                  //   await handleLogin(phone, password);
                }}
              >
                <Form.Item
                  name="phone"
                  labelAlign="right"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập số điện thoại của bạn..."
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu của bạn..."
                    size="large"
                  />
                </Form.Item>
                <Form.Item name="login-button">
                  <Button
                    className="w-full btn-primary app-bg-primary font-semibold "
                    size="large"
                    // type="primary"
                    htmlType="submit"
                    // loading={loading}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Row justify="center" className="mb-2">
                  <Button type="link">Đăng ký tài khoản</Button>
                  <Button type="link">Quên mật khẩu?</Button>
                </Row>
              </Form>
            </Card>
          </LoginFormWrapper>
        </div>
      </Row>
    </Container>
  );
};
