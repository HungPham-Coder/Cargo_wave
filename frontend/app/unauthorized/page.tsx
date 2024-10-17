import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";
import routes from "@/source/router/routes";

const UnauthorizedPage: React.FC = () => (
  <Result
    style={{ marginTop: 50}}
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Link href={routes.root}>
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default UnauthorizedPage;
