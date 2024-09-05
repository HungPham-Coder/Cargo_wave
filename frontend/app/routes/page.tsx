"use client";

import { timelineData } from "@/source/mocks/mocks";
import {
  AutoComplete,
  AutoCompleteProps,
  ConfigProvider,
  Empty,
  Flex,
  Input,
  Timeline,
} from "antd";
import { useState } from "react";

const RoutesList: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [searchText, setSearchText] = useState<string>("");

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

  return (
    <div
      style={{
        paddingLeft: "10%",
        paddingRight: "10%",
      }}
    >
      <h1>Routes</h1>
      <AutoComplete
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
      >
        <Input.Search
          allowClear
          placeholder="input search text"
          onSearch={(value) => setSearchText(value)} // Update search term
          style={{ width: "100%", marginBottom: 20 }}
        />
      </AutoComplete>

      <Flex wrap="wrap" gap="large" style={{ marginTop: 10, cursor: "pointer"}}>
        {filteredData.length > 0 ? (
          filteredData.map((timeline, index) => (
            <div
              key={index}
              style={{
                minWidth: "30vh",
                paddingLeft: "20px",
                height: "auto",
                width: "22%",
                backgroundColor: "#ffffff",
                border: "3px solid #D6D6D6",
                borderRadius: "20px",
                
                fontSize: 20,
              }}
              onClick={() => console.log("Button clicked")} // Example click handler
            >
              <div
                style={{
                  color: "#341F88",
                  marginBottom: 15,
                  marginTop: 10,
                  fontWeight: "bold",
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
                      tailColor: "#000000",
                    },
                  },
                }}
              >
                <Timeline>
                  {timeline.children.map((item, idx) => (
                    <Timeline.Item
                      key={idx}
                      style={{ fontSize: 16 }}
                      color="black"
                    >
                      {item}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </ConfigProvider>
            </div>
          ))
        ) : (
          <Empty
            description="No search results found"
            style={{ width: "86%", marginTop: 50 }}
          />
        )}
      </Flex>
    </div>
  );
};

export default RoutesList;
