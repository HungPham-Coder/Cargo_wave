"use client";

import { Github } from "@icon-park/react";
import { Button, Card, Image, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #f0f5ff;
  display: flex;
  flex-wrap: wrap; /* Allows wrapping if there are too many cards */
  justify-content: center; /* Center the cards */
  gap: 20vh; /* Space between cards */
  margin-top: 2rem; /* Space above the cards */
  border-radius: 50px;
`;

const CategoryCard = styled(Card)`
  width: 500px;
  margin-top: 1rem;
  border-radius: 15px;
`;

const { Title, Paragraph } = Typography;


const AboutPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Title
        level={1}
        style={{
          fontSize: "3rem",
          marginBottom: "2rem",
          color: "#0d3b66",
          marginTop: "5vh",
        }}
      >
        Our Team
      </Title>

      <CardContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Image src="/assets/profile1.jpg" style={{ width: 220 }} />
          <Title
            level={4}
            style={{
              fontSize: "1rem",
            }}
          >
            Pham Phu Minh Hung
          </Title>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="https://github.com/HungPham-Coder">
              <Button
                type="link"
                icon={<Github theme="outline" style={{ color: "black" }} />}
                style={{ padding: 0 }}
              >
                HungPham-Coder
              </Button>
            </Link>
          </div>

          <CategoryCard hoverable>
            <Meta title="Frontend Tasks" />
            <ul style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
              <li>Build UI for the entire webpages.</li>
              <li>Build a comprehensive user information system.</li>
              <li>Integrate APIs for user, role, routes management</li>
              <li>Setup authentication and authorization flow</li>
              <li>Configure routing and navigation</li>
              <li>Implement responsive design</li>
              <li>Implement global state management (React Context).</li>
              <li>Integrate Socket.IO client to handle real-time updates</li>
              <li>
                Handle Socket.IO events for connection, disconnection, and
                messaging.
              </li>
              <li>Implement location-related APIs for Mapbox integration.</li>
              <li>Manage and store location data in the database.</li>
            </ul>
          </CategoryCard>

          <CategoryCard hoverable>
            <Meta title="Backend Tasks" />
            <ul style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
              <li>Design database</li>
              <li>Create entities overall</li>
              <li>
                Build APIs for users, roles, permissions, routes, locations,
                transports.
              </li>
              <li>
                Configure SocketIO for updating real-time roles and permissions
                cases.
              </li>
              <li>
                Pagination and filter for specific services having query large
                data.
              </li>
              <li>
                Set up route data with coordinates for using in map direction.
              </li>
              <li>
                Implement APIs regarding to assign role to user, asign
                permission to role.
              </li>
            </ul>
          </CategoryCard>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src="/assets/profile2.png" style={{ width: 200 }} />
          <Title
            level={4}
            style={{
              fontSize: "1rem",
            }}
          >
            Nguyen Nhat Phuong Dong
          </Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="https://github.com/East1306">
              <Button
                type="link"
                icon={<Github theme="outline" style={{ color: "black" }} />}
                style={{ padding: 0 }}
              >
                NGUYỄN NHẬT PHƯƠNG ĐÔNG
              </Button>
            </Link>
          </div>
          <CategoryCard hoverable>
            <Meta title="Frontend Tasks" />
            <ul style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
              <li>Build UI components for the google login, reset password</li>
              <li>Integrate APIs for google login, forgotpassword</li>
            </ul>
          </CategoryCard>

          <CategoryCard hoverable>
            <Meta title="Backend Tasks" />
            <ul style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
              <li>Design database</li>
              <li>Create entities user, routes, role (basic)</li>
              <li>Build APIs for auth, users, send mail, routes (basic)</li>
              <li>Build Kafka Microservice for notifications</li>
              <li>Configure email sending</li>
              <li>Configure Google Strategy</li>
              <li>Configure PostgreSQL connection</li>
              <li>Configure Docker Compose to run Kafka and database</li>
            </ul>
          </CategoryCard>
        </div>
      </CardContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Title
          level={1}
          style={{
            fontSize: "3rem",
            marginBottom: "2rem",
            color: "#0d3b66",
            marginTop: "10vh",
          }}
        >
          Diagrams
        </Title>

        <Image src="/assets/ERD.jpg" alt="Entity-Relationship Diagram"></Image>
        <Paragraph style={{ fontStyle: "italic", marginTop: "1rem" }}>
          01. Architecture diagram.
        </Paragraph>
        <Image src="/assets/ERD.jpg" alt="Entity-Relationship Diagram"></Image>
        <Paragraph style={{ fontStyle: "italic", marginTop: "1rem" }}>
          02. Entity-Relationship Diagram (ERD).
        </Paragraph>
      </div>
    </div>
  );
};

export default AboutPage;
