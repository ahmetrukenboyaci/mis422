import React, { Fragment } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import mis422 from "../../../api/mis-422";
import CategoryCard from "../../CategoryCard/CategoryCard";

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
    const response = await mis422.get("/public/categories/get-all-categories");

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

    this.setState({ categoryList: data.sort(), loading: false });
  }

  render() {
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    const categoryItem = (ind) =>
      this.state.categoryList.map((categoryItem, i) => {
        let indexCheck = i % 4;
        if (ind === indexCheck) {
          return (
            <ListGroupItem
              key={this.state.categoryList.indexOf(categoryItem)}
              className={`listItem`}
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
                {toTitleCase(categoryItem)}
              </Link>
            </ListGroupItem>
          );
        }
      });

    const searchedItems = (ind) =>
      this.state.categoryList
        .filter((categoryItem) => {
          const regex = new RegExp(this.state.inputValue, "ig");
          return categoryItem.match(regex);
        })
        .map((categoryItem, i) => {
          let indexCheck = i % 4;
          if (ind === indexCheck) {
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
                        categoryName: categoryItem.replace(/\s/g, ""),
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
          }
        });

    return (
      <div className="CategoriesPage">
        <h1>INDUSTRIES</h1>
        <ListGroup className="CategoriesList">
          {this.state.loading ? (
            <div
              className="spinner-border align-self-center text-warning"
              role="status"
            >
              <span className="sr-only">Categories Loading...</span>
            </div>
          ) : (
            <div className="card-container">
              <CategoryCard
                cardBody={
                  this.state.inputValue ? searchedItems(0) : categoryItem(0)
                }
              />
              <CategoryCard
                cardBody={
                  this.state.inputValue ? searchedItems(1) : categoryItem(1)
                }
              />
              <CategoryCard
                cardBody={
                  this.state.inputValue ? searchedItems(2) : categoryItem(2)
                }
              />
              <CategoryCard
                cardBody={
                  this.state.inputValue ? searchedItems(3) : categoryItem(3)
                }
              />
            </div>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesPage;
