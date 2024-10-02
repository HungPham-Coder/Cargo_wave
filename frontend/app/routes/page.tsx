"use client";

import { timelineData } from "@/source/mocks/mocks";
import routes from "@/source/router/routes";
import {
  AutoComplete,
  AutoCompleteProps,
  ConfigProvider,
  Empty,
  Input,
  Row,
  Col,
  Timeline,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title } = Typography;

const RoutesList: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter(); 

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const filteredData = timelineData.filter((timeline) =>
    timeline.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const onSearch = (searchText: string) => {
    if (searchText) {
      const data = filteredData.map((item) => ({ value: item.title }));
      setOptions(data);
    } else {
      setOptions([]);
    }
  };

  const handleCardClick = (id: string) => {
    router.push(routes.routeDetail(id)); 
  };

  return (
    <div
      style={{
        paddingLeft: "2%",
        paddingRight: "2%",
        background: "linear-gradient(135deg, #A0EACD, #82D3F5)", // Sea-like background gradient
        minHeight: "82vh",
      }}
    >
      <Row justify="space-between">
        <Title
          level={3}
          style={{
            color: "#595959", // White text for contrast
            fontWeight: 700,
          }}
        >
          Route List
        </Title>
      </Row>

      <Row gutter={16} justify="space-between">
        <AutoComplete
          style={{ marginBottom: 20 }}
          options={options}
          onSelect={onSelect}
          onSearch={onSearch}
        >
          <Input.Search
            allowClear
            placeholder="Search routes..."
            onSearch={(value) => setSearchText(value)}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              borderColor: "#d9f1f0", // Light sea color border
              backgroundColor: "#e0f7f9", // Light teal input background
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)", // Soft shadow for depth
            }}
          />
        </AutoComplete>
      </Row>

      <Row
        gutter={[16, 16]}
        justify={filteredData.length > 0 ? "start" : "center"}
        style={{ marginTop: 20 }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((timeline, index) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(timeline.id)} 
            >
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#e8fdfd", // Soft sea foam green
                  border: "2px solid #82D3F5", // Bright sea blue border
                  borderRadius: "15px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)", // Soft shadow
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
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.15)";
                }}
              >
                <div
                  style={{
                    color: "#11698E", // Darker blue for text
                    marginBottom: 15,
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {timeline.title}
                </div>
                <ConfigProvider
                  theme={{
                    token: {
                      controlHeight: 0,
                    },
                    components: {
                      Timeline: {
                        tailColor: "#00B7C2", // Sea blue tail
                      },
                    },
                  }}
                >
                  <Timeline>
                    {timeline.children.map((item, idx) => (
                      <Timeline.Item
                        key={idx}
                        style={{ fontSize: 14, color: "#155263" }} // Darker sea green
                        color="blue"
                      >
                        {item}
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </ConfigProvider>
              </div>
            </Col>
          ))
        ) : (
          <Empty
            description="No search results found"
            style={{ width: "86%", marginTop: 50, color: "#fff" }} // White empty state text
          />
        )}
      </Row>
    </div>
  );
};

export default RoutesList;
