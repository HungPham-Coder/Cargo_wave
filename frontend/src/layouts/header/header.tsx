import React, { SetStateAction, useState } from "react";
import { Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import ProfileBar from "./profile";



const AppHeader: React.FC = () => {
  const router = useRouter();

  const [current, setCurrent] = useState("price");
  const [route, setRoute] = useState(router.pathname);


  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    router.push(e.key); // Programmatically navigate to the route
  };

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
            label: "Less-Than-Container-Load (LCL)",
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
    label: "Route",
    key: "SubMenu",
  },
  // {
  //   key: "alipay",
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  // },
];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
        backgroundColor: "white",
        padding: "0 20px",
      }}
    >
      <div>
        {/* <Link to="/"> */}
          <img
            src="src/assets/CARGO WAVE.png"
            style={{
              marginLeft: 50,
              marginTop: 20,
              cursor: "pointer",
              height: 40,
            }}
            alt="Logo"
          />
        {/* </Link> */}
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          flex: 4,
          justifyContent: "center",
          display: "flex",
          fontSize: 20,
        }}
      />
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <ProfileBar />
      </div>
    </Header>
  );
};

export default AppHeader;
