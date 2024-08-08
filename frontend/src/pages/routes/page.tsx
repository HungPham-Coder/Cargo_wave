import { Timeline } from "antd";
import { locationOverall, locationDetail } from "../../mocks/locations";

const RoutesList = () => {
  // const [groupList, setGroupTypeList] = useState([]);
  const timelineData = [
    { title: "1", children: locationDetail },
    { title: "2", children: locationOverall },
    { title: "3", children: ["Event A", "Event B"] },
    { title: "4", children: ["Event A", "Event B"] },
    { title: "5", children: ["Event A", "Event B"] },
    { title: "6", children: ["Event A", "Event B"] },
    { title: "7", children: ["Event A", "Event B"] },
    { title: "8", children: ["Event A", "Event B"] },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        padding: "20px",
        justifyContent: "flex-start",
      }}
    >
      {timelineData.map((timeline, index) => (
        <div
          key={index}
          style={{
            padding: "10px",
            height: "auto",
            width: "300px",
            backgroundColor: "#ffffff",
            display: "inline-block",
            border: "2px solid #1890ff",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "5px",
          }}
          onClick={() => console.log("Button clicked")} // Example click handler
        >
          <h4>{timeline.title}</h4>
          <Timeline style={{ textAlign: "left", width: "100%" }}>
            {timeline.children.map((item, idx) => (
              <Timeline.Item key={idx}>{item}</Timeline.Item>
            ))}
          </Timeline>
        </div>
      ))}
    </div>
  );
};

export default RoutesList;
