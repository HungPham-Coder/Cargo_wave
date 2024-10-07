"use client";

import RouteApi from "@/source/apis/routes";
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
} from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Title } = Typography;

interface Transport {
  id: string;
  name: string;
  license_plate: string;
  status: number;
  shippingType: {
    id: string;
    name: string;
    status: string;
  };
}

interface Location {
  id: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

interface Route {
  id: string;
  name: string;
  departure_time: string;
  arrival_time: string;
  distance: number;
  status: number;
  userID: string;
  transportID: string;
  locationID: string;
  transports: Transport;
  departure: Location;
  arrival: Location;
}

const RoutesList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";

  const getData = async (search: string) => {
    setLoading(true);
    try {
      const response = await RouteApi.findAllBySearch(search);
      setRoutes(response);
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
    getData(value);
  };

  useEffect(() => {
    getData(search);
  }, [search]); // Add search as a dependency to fetch new data on search change

  const handleCardClick = (id: string) => {
    router.push(`/routes/${id}`);
  };

  return (
    <div
      style={{
        paddingLeft: "2%",
        paddingRight: "2%",
        background: "linear-gradient(135deg, #A0EACD, #82D3F5)",
        minHeight: "90vh",
      }}
    >
      <Row justify="space-between">
        <Title level={3} style={{ color: "#595959", fontWeight: 700 }}>
          Route List
        </Title>
      </Row>

      <Input.Search
        allowClear
        placeholder="Search routes..."
        onSearch={handleSearch}
        style={{
          width: 400,
          marginBottom: 20,
          padding: "5px 7px",
          borderRadius: "8px",
          borderColor: "#d9f1f0",
          backgroundColor: "#e0f7f9",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />

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
                onClick={() => handleCardClick(route.id)}
              >
                <div
                  style={{
                    padding: "20px",
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
                      color={statusMap[route.status]?.color || "default"}
                      style={{
                        width: statusMap[route.status]?.width || "auto",
                        marginBottom: 15,
                      }}
                    >
                      {statusMap[route.status]?.text || "Unknown"}
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
                        {route.departure.name}:{" "}
                        {new Date(route.departure_time).toLocaleString(
                          undefined,
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </Timeline.Item>
                      <Timeline.Item style={{ fontSize: 14, color: "#155263" }}>
                        {route.arrival.name}:{" "}
                        {new Date(route.arrival_time).toLocaleString(
                          undefined,
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
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
    </div>
  );
};

export default RoutesList;
