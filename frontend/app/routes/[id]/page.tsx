"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Breadcrumb,
  message,
  Spin,
  Button,
  DatePicker,
} from "antd";
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
  const [isEditing, setIsEditing] = useState(false);
  const borderColors = "#0d3b66";
  const weights = 500;

  const getData = async (handleLoading?: boolean) => {
    if (handleLoading) {
      setLoading(true);
    }
    try {
      const response = await RouteApi.findRouteById(id);
      setRouteDetail(response);
      form.setFieldsValue({
        id: response.id,
        name: response.name,
        distance: response.distance,
        status: response.status,
        departure: response.departure.name,
        arrival: response.arrival.name,
        departure_address: response.departure.address,
        arrival_address: response.arrival.address,
        departure_time: response.departure_time,
        arrival_time: response.arrival_time,
        vehicle_name: response.transport.name,
        license_plate: response.transport.license_plate,
        shipping_type: response.transport.shippingType.name,
      });
    } catch (error) {
      message.error("Failed to fetch route details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!routeDetail) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: "60vh" }}>
        <Spin size="large" />
      </Row>
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    form.resetFields(); // Reset the form fields to their initial values
  };

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
        initialValues={{
          id: routeDetail?.id || "",
          name: routeDetail?.name || "",
          distance: routeDetail?.distance || "",
          status: routeDetail?.status || "",
          departure: routeDetail?.departure.name || "",
          arrival: routeDetail?.arrival.name || "",
          departure_address: routeDetail?.departure.address || "",
          arrival_address: routeDetail?.arrival.address || "",
          departure_time: routeDetail?.departure_time || "",
          arrival_time: routeDetail?.arrival_time || "",
          vehicle_name: routeDetail?.transport.name || "",
          license_plate: routeDetail?.transport.license_plate || "",
          shipping_type: routeDetail?.transport.shippingType.name || "",
        }}
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
            <Col span={24}>
              <Form.Item name="id" hidden>
                <Input />
              </Form.Item>
            </Col>
            <Form.Item name="name" label="Name" style={{ fontWeight: weights }}>
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="distance"
              label="Distance (km)"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="status"
              label="Status"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="departure"
              label="Departure"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="arrival"
              label="Arrival"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="departure_address"
              label="Departure address"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="arrival_address"
              label="Arrival address"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Departure time" style={{ fontWeight: weights }}>
              <DatePicker
                format="hh:mm A - DD/MM/YYYY"
                disabled={!isEditing}
                value={
                  routeDetail.departure_time
                    ? dayjs(routeDetail.departure_time)
                    : null
                }
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: borderColors,
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Arrival time" style={{ fontWeight: weights }}>
              <DatePicker
                format="hh:mm A - DD/MM/YYYY"
                value={
                  routeDetail.arrival_time
                    ? dayjs(routeDetail.arrival_time)
                    : null
                }
                disabled={!isEditing}
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: borderColors,
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="vehicle_name"
              label="Vehicle name"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="license_plate"
              label="License plate"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="shipping_type"
              label="Shipping type"
              style={{ fontWeight: weights }}
            >
              <Input
                readOnly={!isEditing}
                style={{ borderColor: borderColors }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={24} style={{ textAlign: "right" }}>
            {!isEditing ? (
              <Button
                type="primary"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="default"
                  onClick={handleCancelClick}
                  style={{ marginRight: "8px" }}
                >
                  Cancel
                </Button>
                <Button type="primary">Save</Button>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RouteDetailPage;
