import { Button, Result } from "antd";

export const PageNotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Không tìm thấy trang"
    extra={
      <Button type="primary">
        Về trang chủ
      </Button>
    }
  />
);

export default PageNotFound;
