import React from "react";

import "./CompanyProfileF.scss";
import {
  Row,
  Col,
  Button,
  CardImg,
  CardImgOverlay,
  Card,
  Container,
} from "reactstrap";
import charts from "./charts.jpg";
const CompanyProfileF = (props) => {
  return (
    <div className={"CompanyProfile"}>
      <Container fluid>
        <Col className="mt-5">
          <Row xs="6">
            <Col md="6" sm="10" className="offset-lg-3 offset-md-0">
              <Card>
                <CardImg
                  className="blurredBg"
                  width="100%"
                  src={charts}
                  alt="Card image cap"
                />
                <CardImgOverlay>
                  <Button className="button-centered">Unlock Charts</Button>{" "}
                </CardImgOverlay>
              </Card>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default CompanyProfileF;
