import React from "react";
import {Input, ListGroup, ListGroupItem} from "reactstrap";

import { Link } from "react-router-dom";
import mis422 from "../../../api/mis-422";

/** styles **/
import "./CategoriesPage.scss";
import CategoriesIcons from '../../../CategoriesIcons/index';

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
    let categoryList = [];

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
          break;
        default:
          data[index] = category;
          break;
      }
      categoryList.push({name: data[index], icon: CategoriesIcons[data[index].includes("-") ? data[index].toLowerCase().split("-")[1] : data[index].toLowerCase().split(" ")[0]]});
    });



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
            onChange={(e) => {this.setState({ inputValue: e.target.value })}}
            type="search"
            placeholder="Search in Industries"
            value={this.state.inputValue}
        />
        <ListGroup className="CategoriesList">
          {this.state.loading ? (
            <div
              className="spinner-border align-self-center text-warning mr-auto"
              role="status"
            >
              <span className="sr-only">Categories Loading...</span>
            </div>
          ) : (
            <div className="card-container">
              <div className={'litem-group d'}>
                {this.renderCategoriesList(3).map((e, i) => <div key={`3${i}`} className={'litem'}>{e}</div>)}
              </div>
              <div className={'litem-group c'}>
                {this.renderCategoriesList(2).map((e, i) => <div key={`2${i}`} className={'litem'}>{e}</div>)}
              </div>
              <div className={'litem-group b'}>
                {this.renderCategoriesList(1).map((e, i) => <div key={`1${i}`} className={'litem'}>{e}</div>)}
              </div>
              <div className={'litem-group a'}>
                {this.renderCategoriesList(0).map((e, i) => <div key={`0${i}`} className={'litem'}>{e}</div>)}
              </div>
            </div>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesPage;
