"use client";

import { useParams, useSearchParams } from "next/navigation";
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
  Select,
} from "antd";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import routes from "@/source/router/routes";
import RouteApi from "@/source/apis/routes";
import dayjs from "dayjs";
import { statusMap } from "@/source/mocks/mocks";
import LocationApi from "@/source/apis/location";
import TransportApi from "@/source/apis/transport";
import MapComponent from "@/source/components/map";
import { usePermission } from "@/source/hook/usePermission";
import withPermission from "@/source/hook/withPermission";

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

interface RouteDetail {
  id: string;
  name: string;
  departure_time: Date;
  arrival_time: Date;
  latitude: number;
  status: number;
  transport: Transport[];
  departure: Location;
  arrival: Location;
}

const RouteDetailPage: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [routeDetail, setRouteDetail] = useState<any>(null);
  const [routeDetails, setRouteDetails] = useState<RouteDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [locations, setLocations] = useState<Location[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const searchParams = useSearchParams();
  const searchLocation = searchParams.get("location") || "";
  const searchTransport = searchParams.get("transport") || "";
  const [distance, setDistance] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [showRoute, setShowRoute] = useState(false);

  const { hasPermission } = usePermission();
  const canAccessUpdateRouteDetail = hasPermission("routeDetail_update");

  const BORDER_COLOR = "#0d3b66";
  const FONT_WEIGHT = 500;

  const handleDistanceChange = (newDistance: string) => {
    setDistance(newDistance);
    form.setFieldsValue({ distance: newDistance }); // Update the form value
  };

  console.log("distance", distance)

  const getData = async () => {
    setLoading(true);
    try {
      const response = await RouteApi.findRouteById(id);
      setRouteDetail(response);
      setRouteDetails(response);
      // const calculatedDistance = calculateDistance(
      //   response.departure.latitude,
      //   response.departure.longitude,
      //   response.arrival.latitude,
      //   response.arrival.longitude
      // ).toFixed(2);
      // setDistance(calculatedDistance);

      form.setFieldsValue({
        ...response,
        status: response.status,
        departure: response.departure.id,
        arrival: response.arrival.id,
        departure_address: response.departure.address,
        arrival_address: response.arrival.address,
        transport: response.transport.id,
        license_plate: response.transport.license_plate,
        shipping_type: response.transport.shippingType.name,
        departure_time: response.departure_time
          ? dayjs(response.departure_time)
          : null,
        arrival_time: response.arrival_time
          ? dayjs(response.arrival_time)
          : null,
        distance: distance,
      });
      setMapCoordinates({
        latitude: response.departure.latitude,
        longitude: response.departure.longitude,
      });
    } catch (error) {
      message.error("Failed to fetch route details");
    } finally {
      setLoading(false);
    }
  };

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

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    form.resetFields();
    setDistance("");
  };

  useEffect(() => {
    getData();
    getLocationData(searchLocation);
    getTransportData(searchTransport);
  }, []);

  const handleSaveClick = async () => {
    try {
      const values = form.getFieldsValue();
      const formattedValues = {
        name: values.name,
        status: Number(values.status),
        departure: values.departure,
        arrival: values.arrival,
        transport: values.transport,
        departure_time: values.departure_time
          ? values.departure_time.toISOString()
          : null,
        arrival_time: values.arrival_time
          ? values.arrival_time.toISOString()
          : null,
      };
      const response = await RouteApi.updateRouteByID(id, formattedValues);

      if (response) {
        message.success("Route updated successfully");
        setIsEditing(false);
        setRouteDetail(response);
        setRouteDetails(response);
        form.resetFields();
        form.setFieldsValue({
          ...response,
          departure: response.departure.id,
          arrival: response.arrival.id,
          transport: response.transport.id,
          departure_address: response.departure.address,
          arrival_address: response.arrival.address,
          license_plate: response.transport.license_plate,
          shipping_type: response.transport.shippingType.name,
          departure_time: response.departure_time
            ? dayjs(response.departure_time)
            : null,
          arrival_time: response.arrival_time
            ? dayjs(response.arrival_time)
            : null,
          distance: distance,
        });
      } else {
        message.error("Failed to update the route");
      }
    } catch (error) {
      message.error("An error occurred while updating the route");
    } finally {
      setLoading(false);
    }
  };

  // const calculateDistance = (
  //   lat1: number,
  //   lon1: number,
  //   lat2: number,
  //   lon2: number
  // ): number => {
  //   const toRadians = (degree: number) => (degree * Math.PI) / 180;
  //   const R = 6371; // Radius of the Earth in km

  //   const dLat = toRadians(lat2 - lat1);
  //   const dLon = toRadians(lon2 - lon1);

  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(toRadians(lat1)) *
  //       Math.cos(toRadians(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);

  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   return R * c;
  // };

  const handleDistance = () => {
    const departureId = form.getFieldValue("departure");
    const arrivalId = form.getFieldValue("arrival");

    const departureLocation = locations.find((loc) => loc.id === departureId);
    const arrivalLocation = locations.find((loc) => loc.id === arrivalId);

    if (departureLocation && arrivalLocation) {
      setMapCoordinates({
        latitude: arrivalLocation.latitude,
        longitude: arrivalLocation.longitude,
      });
    } else {
      form.setFieldsValue({ distance: "" });
      setDistance("");
    }
  };

  const handleDepartureChange = (value: string) => {
    const selectedLocation = locations.find(
      (location) => location.id === value
    );
    if (selectedLocation) {
      form.setFieldsValue({
        departure_address: selectedLocation.address,
        departure: selectedLocation.id,
      });
      setMapCoordinates({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  };

  const handleArrivalChange = (value: string) => {
    const selectedLocation = locations.find(
      (location) => location.id === value
    );
    if (selectedLocation) {
      form.setFieldsValue({
        arrival_address: selectedLocation.address,
        arrival: selectedLocation.id,
      });
      setMapCoordinates({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  };

  const handleTransportChange = (value: string) => {
    const selectedTransport = transports.find(
      (transport) => transport.id === value
    );
    if (selectedTransport) {
      form.setFieldsValue({
        license_plate: selectedTransport.license_plate,
        shipping_type: selectedTransport.shippingType.name,
        transport: selectedTransport.id,
      });
    }
  };

  return loading || !routeDetail ? (
    <Row justify="center" align="middle">
      <Spin size="large" />
    </Row>
  ) : (
    <div>
      <Breadcrumb
        style={{ margin: "16px 16px" }}
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
            title: (
              <div style={{ color: "#008afb", fontWeight: 500 }}>
                {routeDetail.name}
              </div>
            ),
          },
        ]}
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          id: routeDetail?.id || "",
          name: routeDetail?.name || "",
          status: routeDetail.status || "",
          departure: routeDetail?.departure.id || "",
          arrival: routeDetail?.arrival.id || "",
          transport: routeDetail?.transport.id || "",
          departure_address: routeDetail?.departure.address || "",
          arrival_address: routeDetail?.arrival.address || "",
          departure_time: routeDetail?.departure_time
            ? dayjs(routeDetail.departure_time)
            : null,
          arrival_time: routeDetail?.arrival_time
            ? dayjs(routeDetail.arrival_time)
            : null,
          license_plate: routeDetail?.transport.license_plate || "",
          shipping_type: routeDetail?.transport.shippingType.name || "",
          distance: distance,
        }}
        style={{
          marginLeft: 50,
          marginRight: 50,
          maxWidth: "100%",
          padding: 30,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          border: "1px solid #d9e3f0",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Form.Item name="id" hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Name"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Input readOnly={!isEditing} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="distance"
                  label="Distance (km)"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="status"
                  label="Status"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Select placeholder="Select status" disabled={!isEditing}>
                    {Object.entries(statusMap).map(([key, value]) => (
                      <Select.Option key={Number(key)} value={Number(key)}>
                        {value.text}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Form.Item
                  name="departure"
                  label="Departure"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Select
                    disabled={!isEditing}
                    style={{ borderColor: BORDER_COLOR }}
                    onChange={(value) => {
                      handleDepartureChange(value);
                      handleDistance();
                    }}
                  >
                    {locations.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="departure_address"
                  label="Departure Address"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Form.Item
                  name="arrival"
                  label="Arrival"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Select
                    disabled={!isEditing}
                    style={{ borderColor: BORDER_COLOR }}
                    onChange={(value) => {
                      handleArrivalChange(value);
                      handleDistance();
                    }}
                  >
                    {locations.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="arrival_address"
                  label="Arrival Address"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item
                  name="arrival_time"
                  label="Arrival Time"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <DatePicker
                    format=" hh:mm A - DD/MM/YYYY"
                    style={{ width: "100%" }}
                    showTime={{ format: "hh:mm A", use12Hours: true }}
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="departure_time"
                  label="Departure Time"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <DatePicker
                    format=" hh:mm A - DD/MM/YYYY"
                    style={{ width: "100%" }}
                    showTime={{ format: "hh:mm A", use12Hours: true }}
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Form.Item
                  name="transport"
                  label="Vehicle name"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Select
                    disabled={!isEditing}
                    style={{ borderColor: BORDER_COLOR }}
                    onChange={handleTransportChange}
                  >
                    {transports.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="license_plate"
                  label="License Plate"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="shipping_type"
                  label="Shipping Type"
                  style={{ fontWeight: FONT_WEIGHT }}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <MapComponent
              onDistanceChange={handleDistanceChange}
              startLat={routeDetails?.departure?.latitude!}
              startLng={routeDetails?.departure?.longitude!}
              destLat={routeDetails?.arrival?.latitude!}
              destLng={routeDetails?.arrival?.longitude!}
              showRoute={showRoute}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} justify="end" gutter={[24, 24]}>
          <Button
            className="btn btn-white btn-animate"
            style={{
              fontSize: 17,
              marginRight: 10,
              borderRadius: 50,
              padding: "20px 20px",
              fontWeight: 500,
            }}
            onClick={() => setShowRoute(true)}
          >
            Show Route
          </Button>
          {!isEditing ? (
            canAccessUpdateRouteDetail && (
              <Button
                className="btn btn-white btn-animate"
                style={{
                  fontSize: 17,
                  borderRadius: 50,
                  padding: "20px 20px",
                  fontWeight: 500,
                }}
                onClick={handleEditClick}
              >
                Edit
              </Button>
            )
          ) : (
            <>
              <Button
                onClick={handleCancelClick}
                className="btn btn-cancel btn-animate"
                style={{
                  marginRight: 8,
                  fontSize: 17,
                  borderRadius: 50,
                  padding: "20px 20px",
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-white btn-animate"
                style={{
                  fontSize: 17,
                  borderRadius: 50,
                  padding: "20px 20px",
                  fontWeight: 500,
                }}
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </>
          )}
        </Row>
      </Form>
    </div>
  );
};

// export default RouteDetailPage;
export default withPermission(RouteDetailPage, "route_view");
