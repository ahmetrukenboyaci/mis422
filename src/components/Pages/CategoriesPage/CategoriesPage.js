import React, { Fragment } from "react";
import {Input, ListGroup, ListGroupItem} from "reactstrap";

import { Link } from "react-router-dom";
import mis422 from "../../../api/mis-422";
import CategoryCard from "../../CategoryCard/CategoryCard";

/** styles **/
import "./CategoriesPage.scss";
import {getCookie} from "../../../utils/cookie";
import axios from "axios";

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      loading: true,
      inputValue: '',
      categorized: []
    };
    this.props.handlePageChange();
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

    let categoryList = [];

    const forLoop = async _ => {
      for (let index = 0; index < data.length; index++) {
        let res = await axios.create({
          baseURL: "https://api.iconfinder.com/v4/icons/search",
          headers: { authorization: "Bearer" + " " + "Qk5O7iUvFZmRk8ZFCoVL22URlrLNjCbHG7j13RxtR6qnYzj90zJaIbZ5PzMgDmW0" },
        }).get("", {
          params: {
            query: data[index].includes("-") ? data[index].toLowerCase().split("-")[1] : data[index].toLowerCase().split(" ")[0],
            count:1
          }
        });
        categoryList.push({name: data[index], icon: res.data.icons[0]?.raster_sizes[7]?.formats[0]?.preview_url});
      }
    };
    await forLoop();

    this.setState({
      categoryList: categoryList.sort(() => Math.random() - 0.5),
      categorized: categoryList.sort(() => Math.random() - 0.5),
      loading: false
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.inputValue !== this.state.inputValue) {
      let categoryList = this.state.inputValue.length > 0 ?
          this.state.categorized.filter(e => e.name.includes(this.state.inputValue.toUpperCase())) : this.state.categorized;
      await this.setState({ categoryList: categoryList });
    }
  }

  renderCategoriesList = (i) => {
    let {categoryList} = this.state;
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toUpperCase();
      });
    }

    return categoryList.map((el) => {
      return (
        <ListGroupItem
            key={categoryList.indexOf(el)}
            className={`listItem`}
        >
          <Link
              to={{
                pathname: "/CompaniesPage",
                state: [
                  {
                    categoryName: el.name.replace(/\W/g, ""),
                    url: `/public/categories/${el.name.replace(
                        /\W/g,
                        ""
                    )}/companies`,
                  },
                ],
              }}
          >
            <img alt={"icon"} src={el.icon} className={"icon"} />
            <div className={"text"}>{toTitleCase(el.name)}</div>
          </Link>
        </ListGroupItem>
      );
    }).slice((categoryList.length / 4)*i, (categoryList.length / 4)*(i+1));
  };

  render() {

    return (
      <div className="CategoriesPage">
        <div className={"background-curve"}/>
        <Input
            onChange={(e) => {console.log(e.target.value);this.setState({ inputValue: e.target.value })}}
            type="search"
            placeholder="Search in Industries"
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
          ) : (
            <div className="card-container">
              <div className={'litem-group d'}>
                {this.renderCategoriesList(3).map(e => <div className={'litem'}>{e}</div>)}
              </div>
              <div className={'litem-group c'}>
                {this.renderCategoriesList(2).map(e => <div className={'litem'}>{e}</div>)}
              </div>
              <div className={'litem-group b'}>
                {this.renderCategoriesList(1).map(e => <div className={'litem'}>{e}</div>)}
              </div>
              <div className={'litem-group a'}>
                {this.renderCategoriesList(0).map(e => <div className={'litem'}>{e}</div>)}
              </div>
            </div>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesPage;
