import React from "react";
import { Layout, Row, Col, List } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

const footerQuickLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "My Bids",
    url: "#",
  },
  {
    display: "About Us",
    url: "#",
  },
  {
    display: "Contact Us",
    url: "#",
  },
];

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    url: "#",
  },
  {
    display: "Bidding Guide",
    url: "#",
  },
  {
    display: "Terms of Service",
    url: "#",
  },
];

const CustomFooter = () => {
  return (
    <Footer className="footer">
      <div className="container">
        <Row gutter={[24]}>
          <Col lg={6} md={12} className="mb-4">
            <h4 className="d-flex align-items-center gap-1">
              <Link to="/" style={{ color: "Silver", textDecoration: "none" }}>
                <i className="ri-shake-hands-line"></i> Quick Auctions.
              </Link>
            </h4>

            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                <a href="https://facebook.com">
                  <i className="ri-facebook-line"></i>
                </a>
              </span>
              <span>
                <a href="https://instagram.com">
                  <i className="ri-instagram-line"></i>
                </a>
              </span>
              <span>
                <a href="https://linkedin.com">
                  <i className="ri-linkedin-line"></i>
                </a>
              </span>
              <span>
                <a href="https://x.com">
                  <i className="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg={6} md={12} className="mb-4">
            <h6 className="fw-bold">Explore</h6>
            <List className="link__list">
              {footerQuickLinks.map((item, index) => (
                <List.Item key={index} className="border-0 ps-0 link__item">
                  <Link to={item.url}>{item.display}</Link>
                </List.Item>
              ))}
            </List>
          </Col>

          <Col lg={6} md={12} className="mb-4">
            <h6 className="fw-bold">Information</h6>
            <List className="link__list">
              {footerInfoLinks.map((item, index) => (
                <List.Item key={index} className="border-0 ps-0 link__item">
                  <a href={item.url}>{item.display}</a>
                </List.Item>
              ))}
            </List>
          </Col>

          <Col lg={6} md={12}>
            <h6 className="fw-bold">Get in Touch</h6>
            <p>Address: 07 Red Okai Street, Achimota, Accra-Ghana</p>
            <a href="tel:+233543119117" className="mb-0 d-flex align-items-center gap-2" style={{ color: "silver", textDecoration: "none" }}>
              <i className="ri-phone-line"></i> +233 543 119 117
            </a>
            <p>Email: support@quickauctions.com</p>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default CustomFooter;