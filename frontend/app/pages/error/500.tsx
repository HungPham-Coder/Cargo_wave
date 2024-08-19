import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<Result
			status="500"
			title="Lỗi mất rồi!"
			subTitle="Có lỗi đã xảy ra"
			extra={
				<Button type="primary" onClick={() => navigate("/")}>
					Về trang chủ
				</Button>
			}
		/>
	);
};

export default PageNotFound;