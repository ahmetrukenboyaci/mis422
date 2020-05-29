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
      loading: true,
    };
    this.props.handlePageChange(this.props.location.state[0].categoryName);
  }

  async componentDidMount() {
    window.scroll(0, 0);

    const response = await mis422.get(this.props.location.state[0].url);

    this.setState({
      companyList: response.data,
      loading: false,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.state[0].url !== this.props.location.state[0].url) {
      const response = await mis422.get(this.props.location.state[0].url);
      this.setState({
        companyList: response.data,
        loading: false,
      });
    }
  }

  render() {
    const company = this.state.companyList.map(
      ({ id, name, description, website }) => {
        return (
          <Col key={id} className="col-3">
            <CompanyCard
              companyName={name}
              image={`/${website}`}
              onClickLogin={this.props.onClickLogin}
              category={description}
              id={id}
            />
          </Col>
        );
      }
    );
    const searchedArray = this.state.companyList.filter(({ name }) => {
      const regex = new RegExp(this.state.inputValue, "ig");
      return name.match(regex);
    });
    const searchedItems = searchedArray.map(({ id, name, description, website }) => {
      return (
        <Col key={id} className={`col-${3}`}>
          <CompanyCard
            companyName={name}
            image={`/${website}`}
            onClickLogin={this.props.onClickLogin}
            category={description}
            id={id}
          />
        </Col>
      );
    });
    return (
      <Container fluid className="companiesContainer">
        <Input
          onChange={(e) => this.setState({ inputValue: e.target.value })}
          type="search"
          placeholder="Search in Companies"
          value={this.state.inputValue}
        />
        <Row className={"col-12  justify-content-center"}>
          {this.state.loading ? (
            <div>
              <div className="spinner-grow text-primary" role="status"></div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : this.state.inputValue ? (
            searchedItems
          ) : (
            company
          )}
        </Row>
      </Container>
    );
  }
}

export default CompaniesPage;
