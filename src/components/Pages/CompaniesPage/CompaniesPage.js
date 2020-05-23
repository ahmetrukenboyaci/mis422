import React from "react";
import { Container, Row, Col, Input } from "reactstrap";
import { getCookie, setCookie } from "../../../utils/cookie";

/**  Pages  **/

/** components **/

import CompanyCard from "../../CompanyCard/CompanyCard";

/** styles **/
import "./CompaniesPage.scss";
import "../../../App.scss";
import mis422 from "../../../api/mis-422";
class CompaniesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      companyList: [],
    };
  }

  async componentDidMount() {
    window.scroll(0, 0);

    const response = await mis422.get(this.props.location.state[0].url);

    this.setState({
      companyList: response.data.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      ),
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.state[0].url !== this.props.location.state[0].url) {
      const response = await mis422.get(this.props.location.state[0].url);
      this.setState({
        companyList: response.data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        ),
      });
    }
  }

  search = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    let categoryName = "";
    if (
      this.props.location.state[0].url !==
        "/public/companies/get-all-companies" &&
      this.props.location.state[0].url !== "/api/companies"
    ) {
      categoryName = `${this.props.location.state[0].categoryName.toLowerCase()} Companies`;
    } else {
      categoryName = "All Companies";
    }

    const company = this.state.companyList.map((company) => {
      return (
        <Col key={company.id} className="col-4">
          <CompanyCard
            companyName={company.name}
            //image={company}
            category={company.description}
            id={company.id}
          />
        </Col>
      );
    });
    const searchedArray = this.state.companyList.filter((company) => {
      const regex = new RegExp(this.state.inputValue, "ig");
      return company.name.match(regex);
    });
    const searchedItems = searchedArray.map((company) => {
      return (
        <Col key={company.id} className={`col-${4}`}>
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
        <h1 style={{ textTransform: "capitalize" }}>{categoryName}</h1>
        <Input
          onChange={this.search}
          value={this.state.inputValue}
          type="search"
          placeholder="Search in Companies"
        />
        <Row className={"col-12  justify-content-start"}>
          {this.state.inputValue ? searchedItems : company}
        </Row>
      </Container>
    );
  }
}

export default CompaniesPage;
