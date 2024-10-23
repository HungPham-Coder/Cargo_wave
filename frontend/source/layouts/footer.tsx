import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const FooterContainer = styled(Footer)`
  background: #2876F2; 
  color: white; /* Text color */
  padding: 1rem 0; /* Vertical padding for more space */
  text-align: left;
  border-top: 1px solid #eee; /* Top border for separation */
  font-size: 16px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center; /* Center the entire content */
  flex-wrap: wrap; /* Allow wrapping of sections */
  margin: 0 auto; /* Center the footer content */
  margin-bottom: 1rem; /* Space below the sections */
  width: 70%
`;

const FooterSection = styled.div`
  flex: 1; /* Each section takes equal width */
  margin: 0 1rem; /* Margin between sections */

  h4 {
    color: #ffd700; /* Gold color for section titles */
    margin-bottom: 1rem; /* Space below section title */
  }

  p, a {
    color: white; /* Text color */
    margin: 0.2rem 0; /* Space between items */
    text-decoration: none; /* Remove underline */
  }

  a:hover {
    color: #ffd700; /* Change color on hover */
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; /* Space between icons */
  
  a {
    color: white; /* Icon color */
    font-size: 24px; /* Icon size */
    transition: color 0.3s ease; /* Smooth color transition on hover */
  }

  a:hover {
    color: #ffd700; /* Change color on hover */
  }
`;

const AppFooter: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h4>About us</h4>
          <p>Introduction</p>
          <p>News</p>
          <p>Contact</p>
        </FooterSection>
        <FooterSection>
          <h4>Support</h4>
          <p>Import Route Instructions</p>
          <p>Register Instructions</p>
          <p>Frequently Asked Questions</p>
        </FooterSection>
        <FooterSection>
          <h4>Policy</h4>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </FooterSection>
        <FooterSection>
          <h4>Contact us</h4>
          <p>cargowave@gmail.com</p>
          <p>Call us: 0123546789</p>
          <p>1234 Street, Ho Chi Minh city</p>
        </FooterSection>
      </FooterContent>
      <SocialLinks>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookOutlined />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramOutlined />
        </a>
      </SocialLinks>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        &copy; {new Date().getFullYear()} Created by Team 03.
      </div>
    </FooterContainer>
  );
};

export default AppFooter;
