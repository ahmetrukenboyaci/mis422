import React from "react";
import { Container, Row, Col, Input } from "reactstrap";

/**  Pages  **/

/** components **/

import CompanyCard from "../../CompanyCard/CompanyCard";

/** styles **/
import "./CompaniesPage.scss";
import "../../../App.scss";
import axios from "axios";
class CompaniesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      companyList: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://jsonplaceholder.typicode.com/photos?_start=0&_limit=8")
      .then((res) => this.setState({ companyList: res.data }));
  }
  search = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  render() {
    const company = this.state.companyList.map((company) => {
      return (
        <Col className="Col">
          <CompanyCard
            companyName={company.title}
            image={company.url}
            category={company.title}
            id={company.id}
          />
        </Col>
      );
    });
    const searchedItems = this.state.companyList
      .filter((company) => {
        const regex = new RegExp(this.state.inputValue, "ig");
        return company.title.match(regex);
      })
      .map((company) => {
        return (
          <Col>
            <CompanyCard
              companyName={company.title}
              image={company.url}
              category={company.title}
              id={company.id}
            />
          </Col>
        );
      });
    return (
      <Container fluid className="companiesContainer">
        <h1>All Companies</h1>
        <Input
          onChange={this.search}
          value={this.state.inputValue}
          type="search"
          placeholder="Search in Companies"
        />
        <Row xs="1" sm="2" md="4">
          {this.state.inputValue ? searchedItems : company}
        </Row>
      </Container>
    );
  }
}

export default CompaniesPage;
