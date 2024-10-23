"use client";

import AuthApi from "@/source/apis/auth";
import UserApi from "@/source/apis/users";
import CheckToken from "@/source/constants/utils";
import { UserContext } from "@/source/contexts/UserContext";
import routes from "@/source/router/routes";
import { Carousel, Typography, Button } from "antd";
import { jwtDecode } from "jwt-decode";
import { Map } from "mapbox-gl";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const { Title, Paragraph } = Typography;
const jwt = require('jsonwebtoken');

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 90vh;
  background-color: #f0f5ff;
`;

const CarouselContainer = styled.div`
  width: 50%;
  margin-left: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  filter: brightness(60%);
`;

const Introduction = styled.div`
  text-align: left;
  max-width: 500px;
  margin-right: 2rem;
`;

export default function Home() {
  const images = [
    { src: "/assets/1.jpg", alt: "Image 1" },
    { src: "/assets/2.jpg", alt: "Image 2" },
    { src: "/assets/3.jpg", alt: "Image 3" },
  ];
  const [jwtData, setJwtData] = useState<string | null>(null);

  const onChange = (currentSlide: number) => { };

  const checkTokenAccesstoken = (item: number) => {
    if (item === 1) {
      console.log("TH cap lai");
      localStorage.setItem("accessToken", "1");
      localStorage.setItem("tokenExpirationMs", "2");
      refreshAccessToken();
    } else if (item === 2) {
      console.log("TH phai login lai");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpirationMs");
      localStorage.removeItem("refreshTokenExpirationMs");
    }
  };

  const refreshAccessToken = async () => {
    if (!jwtData) {
      console.log("No refresh token available. Please log in again.");
      return;
    }
    try {
      const response = await AuthApi.refresh(jwtData);
      localStorage.setItem("jwtAccessToken", response.data.accessToken);
      localStorage.setItem("jwtAccessExpire", response.data.accessExpire);
      console.log("Access token refreshed successfully!");
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  const { setUserData, setRoleData } = useContext(UserContext);

  let id: string | undefined;
  if (jwtData) {
    try {
      const decodedJwt = jwtDecode<{ sub: string }>(jwtData);
      id = decodedJwt.sub;
    } catch (error) {
      console.error("Failed to decode JWT: ", error);
    }
  } else {
    console.log("No JWT found, please log in.");
  }

  const getData = async () => {
    if (!id) return;

    try {
      const response = await UserApi.findById(id);
      setUserData(response);

    } catch (error) {
      console.error("Failed to fetch roles: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setJwtData(token);
    if (jwtData) {
      getData();
      checkTokenAccesstoken(CheckToken());
    }
  }, [jwtData]);

  useEffect(() => {
    // Lấy giá trị từ query string
    const params = new URLSearchParams(window.location.search);
    const token = params.get('code');
    if (token) {
      // Thực hiện các hành động cần thiết với token ở đây
      console.log("myToken: ", token);
      const data = jwt.decode(token);
      localStorage.setItem("jwtAccessToken", data.accessToken);
      localStorage.setItem("jwt", data.refreshToken);
      localStorage.setItem("jwtAccessExpire", data.accessExpire);
      localStorage.setItem("jwtRefreshExpire", data.refreshExpire);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      // Cài đặt các giá trị khác vào localStorage như bạn đã làm
    }
  }, []);


  return (
    <HomeContainer>
      <Introduction>
        <Title level={1} style={{ color: "#0d3b66" }}>
          Welcome to the Cargo Wave System
        </Title>
        <Paragraph style={{ fontSize: "1.2rem", color: "#333" }}>
          Our system offers a comprehensive solution for managing users, routes,
          and route details. Easily track and update user information, manage
          shipping routes, and monitor the specifics of each route to ensure
          efficient and optimized operations.
        </Paragraph>

        <Link href={routes.login}>
          <div className="buttons">
            <Button className="blob-btn" type="primary">
              Get Started
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </Button>
            <br />
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    result="blur"
                    stdDeviation="10"
                  ></feGaussianBlur>
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                    result="goo"
                  ></feColorMatrix>
                  <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
        </Link>
      </Introduction>
      <CarouselContainer>
        <Carousel autoplay afterChange={onChange} dots draggable>
          {images.map((image, index) => (
            <div key={index}>
              <StyledImage src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>
      </CarouselContainer>
    </HomeContainer>
  );
}
