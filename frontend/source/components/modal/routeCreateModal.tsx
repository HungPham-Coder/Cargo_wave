import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  InputNumber,
} from "antd";
import BaseModal from "../baseModal";
import RouteApi from "@/source/apis/routes";
import dayjs from "dayjs"; // Lightweight alternative for date handling
import LocationApi from "@/source/apis/location";
import TransportApi from "@/source/apis/transport";
import { useSearchParams } from "next/navigation";
import { statusMap } from "@/source/mocks/mocks";

interface RouteCreateModalProps {
  data?: { id?: string; name?: string };
  onCancel: () => void;
  onSuccess: () => void;
  open: boolean;
}

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

const RouteCreateModal: React.FC<RouteCreateModalProps> = ({
  data,
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const searchParams = useSearchParams();
  const searchLocation = searchParams.get("location") || "";
  const searchTransport = searchParams.get("transport") || "";

  const getLocationData = async (search: string) => {
    setLoading(true);
    try {
      const response = await LocationApi.findAllBySearch(search);
      setLocations(response);
    } catch (error) {
      message.error("Failed to fetch routes. Please try again later.");
      console.error("Failed to fetch routes: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getTransportData = async (search: string) => {
    setLoading(true);
    try {
      const response = await TransportApi.findAllBySearch(search);
      setTransports(response);
    } catch (error) {
      message.error("Failed to fetch routes. Please try again later.");
      console.error("Failed to fetch routes: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationData(searchLocation);
    getTransportData(searchTransport);
    if (data && open) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
      });
    }
  }, [data, open, form]);

  const handleCreateRoute = async (values: any) => {
    setLoading(true);
    console.log("Form Values: ", values);
    try {
      const body = await RouteApi.createRoute({
        ...values,
        status: Number(values.status),
      });
      if (body) {
        message.success("Route created successfully");
        form.resetFields();
        onSuccess();
      } else {
        message.error("Failed to update route");
      }
    } catch (error) {
      message.error("An error occurred while updating the route");
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  const disabledDate = (current: any) => {
    return current && current < dayjs().startOf("day");
  };

  const handleArrivalTimeValidation = () => {
    const departureTime = form.getFieldValue("departure_time");
    const arrivalTime = form.getFieldValue("arrival_time");

    if (departureTime && arrivalTime) {
      const diff = dayjs(arrivalTime).diff(dayjs(departureTime), "minute");
      if (diff < 60) {
        return Promise.reject(
          "Arrival time must be at least 1 hour after departure time"
        );
      }
    }
    return Promise.resolve();
  };

  return (
    <BaseModal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      title="Create Route"
      confirmLoading={loading}
      onOk={() => {
        form.submit();
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateRoute}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Route name"
              name="name"
              rules={[
                { required: true, message: "Please enter the route name" },
              ]}
            >
              <Input placeholder="Enter route name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please enter the status" }]}
            >
              <Select placeholder="Select status">
                {Object.entries(statusMap).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Departure place"
              name="departureID"
              rules={[
                {
                  required: true,
                  message: "Please select the departure place",
                },
              ]}
            >
              <Select placeholder="Select departure place">
                {locations.map((location) => (
                  <Select.Option key={location.id} value={location.id}>
                    {location.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Arrival place"
              name="arrivalID"
              rules={[
                { required: true, message: "Please select the arrival place" },
              ]}
            >
              <Select placeholder="Select arrival place">
                {locations.map((location) => (
                  <Select.Option key={location.id} value={location.id}>
                    {location.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Departure time"
              name="departure_time"
              rules={[
                { required: true, message: "Please select the departure time" },
              ]}
            >
              <DatePicker
                showTime={{ format: "hh:mm A" }}
                format="hh:mm A - DD/MM/YYYY"
                disabledDate={disabledDate}
                placeholder="Select departure time"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Arrival Time"
              name="arrival_time"
              dependencies={["departure_time"]}
              rules={[
                { required: true, message: "Please select the arrival time" },
                { validator: handleArrivalTimeValidation },
              ]}
            >
              <DatePicker
                showTime={{ format: "hh:mm A" }}
                format="DD/MM/YYYY hh:mm A"
                disabledDate={disabledDate}
                placeholder="Select arrival time"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Transport"
              name="transportID"
              rules={[
                { required: true, message: "Please select the transport" },
              ]}
            >
              <Select placeholder="Select transport">
                {transports.map((transport) => (
                  <Select.Option key={transport.id} value={transport.id}>
                    {transport.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default RouteCreateModal;
