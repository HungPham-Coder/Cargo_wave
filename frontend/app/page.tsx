"use client";

import AuthApi from "@/source/apis/auth";
import CheckToken from "@/source/constants/utils";
import routes from "@/source/router/routes";
import { Carousel, Typography, Button } from "antd";
import Link from "next/link";
import { useEffect } from "react";
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
  height: 400px; 
  object-fit: cover;
  filter: brightness(70%);
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
    const refreshToken = localStorage.getItem("jwt");
    if (!refreshToken) {
      console.log("No refresh token available. Please log in again.");
      return;
    }
    try {
      const response = await AuthApi.refresh(refreshToken);
      localStorage.setItem("jwtAccessToken", response.data.accessToken);
      localStorage.setItem("jwtAccessExpire", response.data.accessExpire);
      console.log("Access token refreshed successfully!");
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  useEffect(() => {
    checkTokenAccesstoken(CheckToken());
  }, []);

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
      // localStorage.setItem("roles", JSON.stringify(response.data.user.roles)); 
      // localStorage.setItem("permissions", JSON.stringify(response.data.permissions));
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
          <Button
            type="primary"
            size="large"
            style={{
              background: "linear-gradient(135deg, #0d3b66 0%, #00a6fb 100%)",
              border: "none",
            }}
          >
            Get Started
          </Button>
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
