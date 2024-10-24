import React, { useEffect, useState } from "react";
import { Card, Col, Row, message } from "antd";
import {
  UserOutlined,
  GlobalOutlined,
  KeyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { PageSize } from "@/source/constants/app";
import UserApi from "@/source/apis/users";
import RouteApi from "@/source/apis/routes";
import RoleApi from "@/source/apis/roles";
import PermissionApi from "@/source/apis/permissions";
import {
  Repositioning,
  User,
  UserPositioning,
  UserToUserTransmission,
} from "@icon-park/react";

interface Response {
  data: any;
  total: number;
}

const StatisticPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Response>({ data: [], total: 0 });
  const [roles, setRoles] = useState<Response>({ data: [], total: 0 });
  const [permissions, setPermissions] = useState<Response>({
    data: [],
    total: 0,
  });
  const [routes, setRoutes] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await Promise.all([
        getPermissionData(),
        getRoleData(),
        getUserData(),
        getRouteData(),
      ]);
    };
    getData();
  }, []);

  const getPermissionData = async (
    search?: string,
    pageIndex?: number,
    handleLoading?: boolean
  ) => {
    if (handleLoading) setLoading(true);
    try {
      const response: Response = await PermissionApi.findAllWithPaging(
        search!,
        pageIndex! - 1,
        PageSize.PERMISSION_LIST
      );
      setPermissions(response);
    } catch (error) {
      message.error("Failed to fetch permissions");
    } finally {
      setLoading(false);
    }
  };

  const getRouteData = async () => {
    setLoading(true);
    try {
      const response = await RouteApi.getTotalRoutes();
      setRoutes(response.totalRoutes);
    } catch (error) {
      message.error("Failed to fetch routes.");
    } finally {
      setLoading(false);
    }
  };

  const getRoleData = async (
    search?: string,
    pageIndex?: number,
    status?: boolean
  ) => {
    setLoading(true);
    try {
      const response: Response = await RoleApi.findAllWithPaging(
        search || "",
        pageIndex ? pageIndex - 1 : 0,
        PageSize.ROLE_LIST,
        status!
      );
      setRoles(response);
    } catch (error) {
      message.error("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async (
    search?: string,
    pageIndex?: number,
    status?: number
  ) => {
    try {
      const response: Response = await UserApi.findAllWithPaging(
        search!,
        pageIndex! - 1,
        PageSize.USER_LIST,
        status!
      );
      setUsers(response);
    } catch (error) {
      message.error("Failed to fetch user");
    }
  };

  return (
    <Row gutter={[24, 24]} justify="center" style={{ marginTop: 40, marginBottom: 40 }}>
      <Col span={5}>
        <Card
          title="User"
          bordered={true}
          style={{ borderColor: "#ff4d4f", borderWidth: 2, minWidth: 200 }}
        >
          <div style={cardContentStyle}>
            <span style={numberStyle}>{users.total}</span>

            <User style={iconStyle} />
          </div>
        </Card>
      </Col>
      <Col span={5}>
        <Card
          title="Route"
          bordered={true}
          style={{ borderColor: "#1890ff", borderWidth: 2, minWidth: 200  }}
        >
          <div style={cardContentStyle}>
            <span style={numberStyle}>{routes}</span>

            <Repositioning style={iconStyle} />
          </div>
        </Card>
      </Col>
      <Col span={5}>
        <Card
          title="Permission"
          bordered={true}
          style={{ borderColor: "#52c41a", borderWidth: 2, minWidth: 200  }}
        >
          <div style={cardContentStyle}>
            <span style={numberStyle}>{permissions.total}</span>

            <UserToUserTransmission style={iconStyle} />
          </div>
        </Card>
      </Col>
      <Col span={5}>
        <Card
          title="Role"
          bordered={true}
          style={{ borderColor: "#faad14", borderWidth: 2, minWidth: 200  }}
        >
          <div style={cardContentStyle}>
            <span style={numberStyle}>{roles.total}</span>
            <UserPositioning style={iconStyle} />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

// Styles
const cardContentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const numberStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: "bold",
};

const iconStyle: React.CSSProperties = {
  fontSize: "2rem",
  color: "#595959",
};

export default StatisticPage;
