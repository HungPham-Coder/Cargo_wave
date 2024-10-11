"use client";

import AuthApi from "@/source/apis/auth";
import CheckToken from "@/source/constants/utils";
import { Carousel } from "antd";
import { useEffect } from "react";

export default function Home() {
  const images = [
    { src: "/assets/1.jpg", alt: "Image 1" },
    { src: "/assets/1.jpg", alt: "Image 2" },
    { src: "/assets/1.jpg", alt: "Image 3" },
  ];

  const onChange = (currentSlide: number) => {};

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
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        <Carousel
          autoplay
          swipe
          arrows
          infinite={true}
          afterChange={onChange}
          dots={true}
          draggable
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "auto",
                  filter: "brightness(50%)",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
