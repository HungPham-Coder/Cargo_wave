"use client";

import RouteApi from "@/source/apis/routes";
import MapComponent from "@/source/components/map";
import RouteCreateModal from "@/source/components/modal/routeCreateModal";
import { usePermission } from "@/source/hook/usePermission";
import withPermission from "@/source/hook/withPermission";
import { statusMap } from "@/source/mocks/mocks";
import {
  ConfigProvider,
  Empty,
  Input,
  Row,
  Col,
  Timeline,
  Typography,
  message,
  Spin,
  Tag,
  Button,
  Select,
} from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const { Title } = Typography;

interface Transport {
  id?: string;
  name?: string;
  license_plate?: string;
  status?: number;
  shippingType?: {
    id?: string;
    name?: string;
    status?: string;
  };
}

interface Location {
  id?: string;
  name?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
}

interface Route {
  id?: string;
  name?: string;
  departure_time?: string;
  arrival_time?: string;
  status?: number;
  userID?: string;
  transportID?: string;
  locationID?: string;
  transports?: Transport;
  departure?: Location;
  arrival?: Location;
}

const RoutesList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const { hasPermission } = usePermission();

  const canAccessCreateRoute = hasPermission("route_create");

  const getData = async (search?: string, status?: number) => {
    setLoading(true);
    try {
      const response = await RouteApi.findAllBySearch(search, status);
      setRoutes(response);
      const url = new URL(window.location.href);
      url.searchParams.set("search", search!);
      if (status !== undefined) {
        url.searchParams.set("status", status.toString());
      } else {
        url.searchParams.delete("status");
      }
      router.push(url.toString());
      console.log("Routes: ", routes);
    } catch (error) {
      message.error("Failed to fetch routes. Please try again later.");
      console.error("Failed to fetch routes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    router.push(`?search=${value}`);
    getData(value, selectedStatus);
  };

  useEffect(() => {
    getData(search, selectedStatus);
  }, [search]);

  const handleCardClick = (id: string) => {
    router.push(`/routes/${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} ${ampm} - ${day}/${month}/${year}`;
  };

  return (
    <div
      style={{
        paddingLeft: "2%",
        paddingRight: "2%",
        background: "linear-gradient(135deg, #A0EACD, #82D3F5)",
        minHeight: "100%",
        marginBottom: 30,
      }}
    >
      <Row justify="space-between">
        <Title level={3} style={{ color: "#595959", fontWeight: 700 }}>
          Route List
        </Title>
      </Row>

      <Row justify="space-between">
        <Col>
          <Input.Search
            allowClear
            placeholder="Search routes..."
            onSearch={handleSearch}
            style={{
              width: "30vh",
              flex: 1,
              marginBottom: 20,
              marginRight: 40,
              padding: "5px 7px",
              borderRadius: "8px",
              borderColor: "#d9f1f0",
              backgroundColor: "#e0f7f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />

          <Select
            allowClear
            placeholder="Filter status..."
            value={selectedStatus}
            onChange={(value) => {
              setSelectedStatus(value);
              getData(search, value);
            }}
            style={{
              width: 200,
              marginBottom: 20,
              flex: 2,
              padding: "5px 7px",
              borderRadius: "8px",
              borderColor: "#d9f1f0",
              backgroundColor: "#e0f7f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              height: 41,
            }}
            dropdownStyle={{
              borderRadius: "8px",
              borderColor: "#d9f1f0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            getPopupContainer={(trigger) => trigger.parentNode} // Ensure dropdown positioning is correct
          >
            {Object.entries(statusMap).map(([key, { text }]) => (
              <Select.Option key={key} value={Number(key)}>
                {text}
              </Select.Option>
            ))}
          </Select>
        </Col>

        {canAccessCreateRoute && (
          <Col>
            <Button
              style={{
                fontSize: 18,
                borderRadius: 50,
                padding: "20px 20px",
                fontWeight: 700,
              }}
              className="btn btn-white btn-animate"
              onClick={() => setShowItemModal(true)}
            >
              Create route
            </Button>
          </Col>
        )}
      </Row>

      {loading ? (
        <Row justify="center" style={{ marginTop: 20 }}>
          <Spin size="large" />
        </Row>
      ) : (
        <Row
          gutter={[16, 16]}
          justify={routes.length > 0 ? "start" : "center"}
          style={{ marginTop: 20 }}
        >
          {routes.length > 0 ? (
            routes.map((route) => (
              <Col
                key={route.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(route!.id!)}
              >
                <div
                  style={{
                    padding: 20,
                    backgroundColor: "#e8fdfd",
                    border: "2px solid #82D3F5",
                    borderRadius: "15px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    minHeight: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.05)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 6px 15px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 10px rgba(0,0,0,0.15)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        color: "#11698E",
                        marginBottom: 15,
                        fontWeight: "bold",
                        fontSize: "18px",
                        flexGrow: 1,
                      }}
                    >
                      {route.name}
                    </div>

                    <Tag
                      color={statusMap[route.status!]?.color || "default"}
                      style={{
                        width: "auto",
                        fontWeight: 500,
                        marginBottom: 15,
                      }}
                    >
                      {statusMap[route.status!]?.text || "Unknown"}
                    </Tag>
                  </div>

                  <ConfigProvider
                    theme={{
                      token: { controlHeight: 0 },
                      components: { Timeline: { tailColor: "#00B7C2" } },
                    }}
                  >
                    <Timeline>
                      <Timeline.Item style={{ fontSize: 14, color: "#155263" }}>
                        {route.departure!.name!}:{" "}
                        {formatDate(route.departure_time!)}
                      </Timeline.Item>
                      <Timeline.Item style={{ fontSize: 14, color: "#155263" }}>
                        {route.arrival!.name!}:{" "}
                        {formatDate(route.arrival_time!)}
                      </Timeline.Item>
                    </Timeline>
                  </ConfigProvider>
                </div>
              </Col>
            ))
          ) : (
            <Empty
              description={
                <span style={{ color: "#595959" }}>
                  No search results found
                </span>
              }
              style={{ width: "86%", marginTop: 50 }}
            />
          )}
        </Row>
      )}
      <RouteCreateModal
        onCancel={() => setShowItemModal(false)}
        onSuccess={() => getData(search)}
        open={showItemModal}
      ></RouteCreateModal>
    </div>
  );
};

// export default RoutesList;
export default withPermission(RoutesList, "route_view");
