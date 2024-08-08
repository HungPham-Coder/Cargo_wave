import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const PageNotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Không tìm thấy trang"
    extra={
      <Button type="primary" onClick={() => navigate("/")}>
        Về trang chủ
      </Button>
    }
  />
);

export default PageNotFound;
