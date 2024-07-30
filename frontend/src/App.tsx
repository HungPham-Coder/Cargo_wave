
import "./App.css";
import RoutesList from "./pages/routes";
import { SetStateAction, useState } from "react";
import { Menu } from "antd";

const items = [
  {
    label: "Price",
    key: "price",
  },
  {
    label: "Book",
    key: "submenu",
    children: [
      {
        type: "group",
        label: "Shipping",
        children: [
          {
            label: "Ocean Transport (Containers)",
            key: "setting:1",
             
          },
          {
            label: "Less-Than-Containter-Load (LCL)",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Flight",
        children: [
          {
            label: "Air freight",
            key: "setting:3",
          },
        
        ],
      },
    ],
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    
  },
  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

function App() {
  const [current, setCurrent] = useState("mail");
  const onClick = (e: { key: SetStateAction<string>; }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <RoutesList></RoutesList>
    </>
  );
}

export default App;
