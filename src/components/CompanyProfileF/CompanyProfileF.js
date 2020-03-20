import React from "react";

import "./CompanyProfileF.scss";
import { Row, Col, Button, CardImg, CardImgOverlay, Card } from "reactstrap";
import charts from "./charts.jpg";
const CompanyProfileF = props => {
  return (
    <div className={"CompanyProfile"}>
      <Col className="mt-5">
        <Row xs="6">
          <div className="col-8">
            <Card inverse>
              <CardImg
                className="blurredBg"
                width="100%"
                src={charts}
                alt="Card image cap"
              />

              <CardImgOverlay className="d-flex justify-content-center align-items-center">
                <Button className="col-2" color="primary">
                  Unlock Charts
                </Button>{" "}
              </CardImgOverlay>
            </Card>
          </div>
        </Row>
      </Col>
    </div>
  );
};

export default CompanyProfileF;
