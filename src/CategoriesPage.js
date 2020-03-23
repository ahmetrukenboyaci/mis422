import React from "react";
import { Container, Row, Col } from "reactstrap";

/** components **/

import CategoryTable from "./components/CategoryTable/CategoryTable";

/** styles **/
import "./CategoriesPage.scss";
import "./App.scss";
class CategoriesPage extends React.Component {
  render() {
    return (
      <Container className="Container" fluid>
        <Row className="Row">
          <Col className="Col">
            <p>Category Name</p>
            <CategoryTable />
          </Col>
          <Col className="Col">
            <p>Category Name</p>
            <CategoryTable />
          </Col>
        </Row>
        <Row className="Row">
          <Col className="Col">
            <p>Category Name</p>
            <CategoryTable />
          </Col>
          <Col className="Col">
            <p>Category Name</p>
            <CategoryTable />
          </Col>
        </Row>
        <Row className="Row">
          <Col className="Col">
            <p>Category Name</p>
            <CategoryTable />
          </Col>
          <Col className="Col">
            <p>Category Name</p>
            <CategoryTable />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CategoriesPage;
