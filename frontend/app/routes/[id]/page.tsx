"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { timelineData } from "@/source/mocks/mocks"; // Assuming timelineData is your data source
import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Breadcrumb,
} from "antd";
import Link from "next/link";
import routes from "@/source/router/routes";
import { HomeOutlined } from "@ant-design/icons";

const TimelineDetailPage: React.FC = () => {
  const { id } = useParams();
  const [timelineDetail, setTimelineDetail] = useState<any>(null);
  const [form] = Form.useForm();
  const iconSize = 20;

  useEffect(() => {
    const detail = timelineData.find((item) => item.id === id);
    setTimelineDetail(detail);
  }, [id, form]);

  if (!timelineDetail) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontSize: "24px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Component */}
      <Breadcrumb style={{ margin: "16px 16px" }}>
        <Breadcrumb.Item>
          <Link href={routes.root}>
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={routes.route}>Route</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{id}</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        form={form}
        layout="vertical"
        style={{
          marginTop: "3%",
          marginBottom: "5%",
          maxWidth: "70%",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "30px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Form.Item name="name" label="Name">
              <Input value={timelineDetail.name} readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="distance" label="Distance">
              <Input value={timelineDetail.distance} readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="Status">
              <Input value={timelineDetail.status} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="port_start" label="Port Start">
              <Input value={timelineDetail.port_start} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="port_end" label="Port End">
              <Input value={timelineDetail.port_end} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="departure_time" label="Departure Time">
              <DatePicker
                showTime
                value={timelineDetail.departure_time}
                disabled
                placeholder="Date"
                style={{ backgroundColor: "#ffffff" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="arrival_time" label="Arrival Time">
              <DatePicker
                showTime
                value={timelineDetail.arrival_time}
                disabled
                placeholder="Date"
                style={{ backgroundColor: "#ffffff" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="status" label="Status">
              <Input value={timelineDetail.status} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ship_type" label="Ship Type">
              <Input value={timelineDetail.ship_type} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="vehicle_type" label="Vehicle Type">
              <Input value={timelineDetail.vehicle_type} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="vehicle_name" label="Vehicle Name">
              <Input value={timelineDetail.vehicle_name} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="license_plate" label="License Plate">
              <Input value={timelineDetail.license_plate} readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TimelineDetailPage;
