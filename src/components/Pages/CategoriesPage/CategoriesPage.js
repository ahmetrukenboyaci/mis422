import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import mis422 from "../../../api/mis-422";

/** styles **/
import "./CategoriesPage.scss";

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      inputValue: "",
      loading: true,
    };
  }

  async componentDidMount() {
    window.scroll(0, 0);
    let response = await mis422.get("/public/categories/get-all-categories");

    let data = response.data.sort();

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
    this.setState({ categoryList: data, loading: false });
  }

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
              state: [
                {
                  categoryName: categoryItem.replace(/\W/g, ""),
                  url: `/public/categories/${categoryItem.replace(
                    /\W/g,
                    ""
                  )}/companies`,
                },
              ],
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
    console.log(searchedItems.length);

    return (
      <div className="CategoriesPage">
        <h1>All Categories </h1>
        <Input
          onChange={(e) => this.setState({ inputValue: e.target.value })}
          type="search"
          placeholder="Search in Categories"
          value={this.state.inputValue}
        />
        <ListGroup className="CategoriesList">
          {this.state.loading ? (
            <div
              className="spinner-border align-self-center text-warning"
              role="status"
            >
              <span className="sr-only">Categories Loading...</span>
            </div>
          ) : this.state.inputValue ? (
            searchedItems
          ) : (
            categoryItem
          )}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesPage;
