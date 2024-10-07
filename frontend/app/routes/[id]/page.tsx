"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Row, Col, Form, Input, Breadcrumb, message, Spin } from "antd";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import routes from "@/source/router/routes";
import RouteApi from "@/source/apis/routes";
import dayjs from "dayjs";

const RouteDetailPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [routeDetail, setRouteDetail] = useState<any>(null);
  const [form] = Form.useForm();

  const getData = async (handleLoading?: boolean) => {
    if (handleLoading) {
      setLoading(true);
    }
    try {
      const response = await RouteApi.findRouteById(id);
      setRouteDetail(response);
      console.log("Fetched route detail:", response);
    } catch (error) {
      message.error("Failed to fetch route details");
      console.error("Failed to fetch route details: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!routeDetail) {
    return (
      <Row
      justify="center"
      align="middle" // Center vertically
      style={{
        minHeight: "60vh", // Full height of the viewport
      }}
    >
      <Spin size="large" />
    </Row>
    );
  }

  return (
    <div style={{ padding: "20px", background: "#e0f7fa", minHeight: "100vh" }}>
      <Breadcrumb
        style={{ margin: "16px 0", fontSize: "16px" }}
        items={[
          {
            title: (
              <Link href={routes.root}>
                <HomeOutlined /> Home
              </Link>
            ),
          },
          {
            title: <Link href={routes.route}>Route</Link>,
          },
          {
            title: routeDetail.name,
          },
        ]}
      />

      <Form
        form={form}
        layout="vertical"
        style={{
          marginTop: "3%",
          marginBottom: "5%",
          maxWidth: "70%",
          margin: "auto",
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          border: "1px solid #d9e3f0",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Form.Item label="Name" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.name}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Distance (km)" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.distance}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Status" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.status}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Departure" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.departure.name}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Arrival" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.arrival.name}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Departure address" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.departure.address}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Arrival address" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.arrival.address}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Departure time" style={{ fontWeight: 500 }}>
              <Input
                value={
                  routeDetail.departure_time
                    ? dayjs(routeDetail.departure_time).format(
                        "hh:mm A - DD/MM/YYYY"
                      )
                    : ""
                }
                readOnly
                style={{ backgroundColor: "#ffffff", borderColor: "#0d3b66" }}
                placeholder="Date"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Arrival time" style={{ fontWeight: 500 }}>
              <Input
                value={
                  routeDetail.arrival_time
                    ? dayjs(routeDetail.arrival_time).format(
                        "hh:mm A - DD/MM/YYYY"
                      )
                    : ""
                }
                readOnly
                style={{ backgroundColor: "#ffffff", borderColor: "#0d3b66" }}
                placeholder="Date"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Vehicle name" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.transports.name}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="License plate" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.transports.license_plate}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Shipping type" style={{ fontWeight: 500 }}>
              <Input
                value={routeDetail.transports.shippingType.name}
                readOnly
                style={{ borderColor: "#0d3b66" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RouteDetailPage;
