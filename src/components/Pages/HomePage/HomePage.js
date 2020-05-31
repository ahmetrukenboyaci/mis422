import React, { Component } from "react";
import mis422 from "../../../api/mis-422";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";

import "./HomePage.scss";
import CompaniesPage from "../CompaniesPage/CompaniesPage";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { last10company: [] };
    this.props.handlePageChange();
  }
  async componentDidMount() {
    const response = await mis422.get("/public/companies/get-name-and-id");
    this.setState({ last10company: response.data });
  }

  render() {
    return (
      <div className="socialMedia">
        <CompaniesPage location={{state: [{url: "/public/companies/get-all-companies"}]}} handlePageChange={this.props.handlePageChange}/>
      </div>
    );
  }
}
