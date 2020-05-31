import React from "react";
import "./CompanyProfileF.scss";
import {
  Row,
  Col,
  CardImg,
  CardImgOverlay,
  Card,
  Container,
} from "reactstrap";
import charts from "./charts.jpg";
import lock from '../../icons/left-icon.svg';

const CompanyProfileF = (props) => {
  return (
    <div className={"CompanyProfile"}>
      <Container fluid>
        <Col className="mt-5">
          <Row xs="12">
            <Col md="12" sm="12" className="offset-md-0">
              <Card>
                <CardImg
                  className="blurredBg"
                  width="100%"
                  src={charts}
                  alt="Card image cap"
                />
                <CardImgOverlay>
                  <div onClick={() => props.onClickLogin()} className="button-centered">
                    <img className={"lockIcon"} src={lock} alt={"lock"} />
                    <div className={"buttonText"}>Unlock {props.swot ? "SWOT" : "Five Forces"} Charts</div>
                  </div>
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
