import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import styles from "./Footer.scss";

/** icons */
import twitter from "../../icons/twitter.svg";
import instagram from "../../icons/instagram.svg";
import linkedin from "../../icons/linkedin.svg";
class Footer extends Component {
  render() {
    return (
      <div className={"Footer"}>
        <Container className="Container" fluid>
          <Row xs="12" className="text-right">
            <Col xs="8" className="text-left">
              Copyright | 2020
            </Col>{" "}
            <Col xs="12" sm="12">
              <ul>
                <li>
                  <a href="">FAQ</a>
                </li>
                <li>
                  {" "}
                  <a href="">Terms of Service</a>
                </li>
                <li>
                  {" "}
                  <a href="">Team</a>
                </li>
                <li>
                  {" "}
                  <a href="">Privacy Policy</a>
                </li>
                <li>
                  {" "}
                  <a href="">Cookie Policy</a>
                </li>
                <li>
                  {" "}
                  <a href="">Contact</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
