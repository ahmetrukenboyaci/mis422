import React from "react";
import { Container, Row, Col } from "reactstrap";

/**  pages  **/

/** components **/

import CompanyCard from "./components/CompanyCard/CompanyCard";

/** styles **/
import "./CompaniesPage.scss";
import "./App.scss";
class CompaniesPage extends React.Component {
  render() {
    return (
      <Container fluid className="Container">
        <Row className="Row" xs="1" sm="2" md="4">
          <Col className="Col">
            <CompanyCard />
          </Col>
          <Col className="Col">
            <CompanyCard />
          </Col>
          <Col className="Col">
            <CompanyCard />
          </Col>
          <Col className="Col">
            <CompanyCard />
          </Col>
        </Row>
        <Row className="Row" xs="1" sm="2" md="4">
          <Col className="Col">
            <CompanyCard />
          </Col>
          <Col className="Col">
            <CompanyCard />
          </Col>
          <Col className="Col">
            <CompanyCard />
          </Col>
          <Col className="Col">
            <CompanyCard />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CompaniesPage;
