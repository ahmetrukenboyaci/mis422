import React from "react";
import { Container, Row, Col } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Input, Badge } from "reactstrap";
import axios from "axios";
/** components **/
/** styles **/
import "./CategoriesPage.scss";

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      inputValue: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users?_limit=10")
      .then((res) => this.setState({ categoryList: res.data }));
  }

  search = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const categoryItem = this.state.categoryList.map((categoryItem) => {
      return (
        <ListGroupItem className="listItem">
          {categoryItem.name}
          {/* <Badge className="badge">{categoryItem.id}</Badge> */}
        </ListGroupItem>
      );
    });

    const searchedItems = this.state.categoryList
      .filter((categoryItem) => {
        const regex = new RegExp(this.state.inputValue, "ig");
        return categoryItem.name.match(regex);
      })
      .map((categoryItem) => {
        return (
          <ListGroupItem className="listItem">
            {categoryItem.name}
            {/* <Badge className="badge">{categoryItem.id}</Badge> */}
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
          {this.state.inputValue ? searchedItems : categoryItem}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesPage;
