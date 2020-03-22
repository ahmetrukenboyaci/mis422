import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import styles from "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className={"Footer"}>
        <Container fluid>
          <Row xs="2">
            <Col xs="5" md={{ span: 3, offset: 6 }}>
              <ul className="align-self-end">
                <li>XXX</li>
                <li>XXX</li>
                <li>XXX</li>
                <li>XXX</li>
                <li>XXX</li>
              </ul>
            </Col>
          </Row>

          <hr className="col-12" />

          <Row xs="2">
            <Col>Copyright 2020</Col>
            <Col className="d-flex ">
              <div>Logo</div>
              <div>Logo</div>
              <div>Logo</div>
              <div>Logo</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
