"use client";

import { Carousel } from "antd";

export default function Home() {
  const images = [
    { src: "/assets/1.jpg", alt: "Image 1" },
    { src: "/assets/1.jpg", alt: "Image 2" },
    { src: "/assets/1.jpg", alt: "Image 3" },
  ];

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

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
