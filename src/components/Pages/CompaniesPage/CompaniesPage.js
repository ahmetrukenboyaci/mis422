import React from "react";
import { Container, Row, Col, Input } from "reactstrap";
import mis422 from "../../../api/mis-422";

/**  Pages  **/
import "./CompaniesPage.scss";

/** components **/
import CompanyCard from "../../CompanyCard/CompanyCard";

/** styles **/
import "../../../App.scss";

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
    console.log(this.props.location.state[0]);

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

    const company = this.state.companyList.map(({ id, name, description }) => {
      return (
        <Col key={id} className="col-4">
          <CompanyCard
            companyName={name}
            //image={company}
            category={description}
            id={id}
          />
        </Col>
      );
    });
    const searchedArray = this.state.companyList.filter(({ name }) => {
      const regex = new RegExp(this.state.inputValue, "ig");
      return name.match(regex);
    });
    const searchedItems = searchedArray.map(({ id, name, description }) => {
      return (
        <Col key={id} className={`col-${4}`}>
          <CompanyCard
            companyName={name}
            //image={company}
            category={description}
            id={id}
          />
        </Col>
      );
    });
    return (
      <Container fluid className="companiesContainer">
        <h1 style={{ textTransform: "capitalize" }}>{categoryName}</h1>
        <Input
          onChange={(e) => this.setState({ inputValue: e.target.value })}
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
