import React, { Fragment } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

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
    const categorized = [];
    const groupAs = this.state.categoryList.length / 4;
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    const categoryItem = this.state.categoryList.map((categoryItem) => {
      {
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

    for (let i = 0; i < categoryItem.length; i += groupAs) {
      categorized.push(categoryItem.slice(i, i + groupAs));
    }

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
              <CategoryCard cardBody={categorized[0]} />
              <CategoryCard cardBody={categorized[1]} />
              <CategoryCard cardBody={categorized[2]} />
              <CategoryCard cardBody={categorized[3]} />
            </div>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesPage;
