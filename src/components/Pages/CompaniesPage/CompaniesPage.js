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

  async componentDidMount() {
    if (!this.props.location.state) {
      const response = await axios.get(
        "https://mis-422.herokuapp.com/public/companies/get-all-companies"
      );
      this.setState({ companyList: response.data });
    } else {
      const response = await axios.get(
        `https://mis-422.herokuapp.com/public/categories/${this.props.location.state[0].categoryName}/companies`
      );
      this.setState({ companyList: response.data });
      this.props.location.state = undefined;
    }
  }

  search = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  render() {
    const company = this.state.companyList.map((company) => {
      return (
        <Col key={company.id} className="Col">
          <CompanyCard
            companyName={company.name}
            //image={company}
            category={company.description}
            id={company.id}
          />
        </Col>
      );
    });
    const searchedItems = this.state.companyList
      .filter((company) => {
        const regex = new RegExp(this.state.inputValue, "ig");
        return company.name.match(regex);
      })
      .map((company) => {
        return (
          <Col key={company.id} className="Col">
            <CompanyCard
              companyName={company.name}
              //image={company}
              category={company.description}
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
