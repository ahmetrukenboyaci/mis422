import React from "react";
import { Container, Row, Col } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Input, Badge } from "reactstrap";
import axios from "axios";
/** components **/
/** styles **/
import "./CategoriesPage.scss";
import { Link } from "react-router-dom";

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      inputValue: "",
    };
  }

  async componentDidMount() {
    let response = await axios.get(
      "https://mis-422.herokuapp.com/public/categories/get-all-categories"
    );

    let data = response.data;

    data.forEach((category, index) => {
      switch (category) {
        case "MEDIACOMMUNICATIONSENTERTAINTMENT":
          data[index] = "MEDIA COMMUNICATIONS ENTERTAITNMENT";
          break;
        case "ECOMMERCE":
          data[index] = "E-COMMERCE";
          break;
        case "MARKETINGTECHNOLOGIES":
          data[index] = "MARKETING TECHNOLOGIES";
          break;
        case "MARKETRESEARCH":
          data[index] = "MARKET RESEARCH";
          break;
        case "BLOCKCHAINCYRPTOCURRENCY":
          data[index] = "BLOCKCHAIN CYRPTO CURRENCY";
          break;
        case "REALESTATE":
          data[index] = "REAL ESTATE";
          break;
        case "PROFESSIONALSCIENTIFICANDTECHNICALSERVICES":
          data[index] = "PROFESSIONAL SCIENTIFIC AND TECHNICAL SERVICES";
      }
    });
    this.setState({ categoryList: data });
  }

  search = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const categoryItem = this.state.categoryList.map((categoryItem) => {
      return (
        <ListGroupItem
          key={this.state.categoryList.indexOf(categoryItem)}
          className="listItem"
        >
          <Link
            to={{
              pathname: "/CompaniesPage",
              state: [{
                categoryName: categoryItem.replace(/\W/g, ""),
                url: `https://mis-422.herokuapp.com/public/categories/${categoryItem.replace(/\W/g, "")}/companies`
              }],
            }}
          >
            {categoryItem}
          </Link>
        </ListGroupItem>
      );
    });

    const searchedItems = this.state.categoryList
      .filter((categoryItem) => {
        const regex = new RegExp(this.state.inputValue, "ig");
        return categoryItem.match(regex);
      })
      .map((categoryItem) => {
        return (
          <ListGroupItem
            key={this.state.categoryList.indexOf(categoryItem)}
            className="listItem"
          >
            <Link
              to={{
                pathname: "/CompaniesPage",
                state: [{ categoryName: categoryItem.replace(/\s/g, "") }],
              }}
            >
              {categoryItem}
            </Link>
          </ListGroupItem>
        );
      });

    return (
      <div className="CategoriesPage">
        <h1>Categories</h1>
        <Input
          onChange={this.search}
          type="search"
          placeholder="Search in Categories"
        />
        <ListGroup className="CategoriesList">
          {this.state.inputValue ? searchedItems : categoryItem}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesPage;
