import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className={"Footer"}>
        <Container className="Container" fluid>
          <Row xs="12" className="text-right">
            <Col xs="8" className="text-left">
              Copyright | 2020
            </Col>{" "}
            <Col xs="4" sm="4" className={"footer-about-us"}>
              <a href={"/"}>FAQ</a>
              {" "}
              <a href={"/"}>Terms of Service</a>
              {" "}
              <a href={"/"}>Team</a>
              {" "}
              <a href={"/"}>Privacy Policy</a>
              {" "}
              <a href={"/"}>Cookie Policy</a>
              {" "}
              <a href={"/"}>Contact</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
