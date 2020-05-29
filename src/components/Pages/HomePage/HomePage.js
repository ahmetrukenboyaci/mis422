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

  renderlast10() {
    let { last10company } = this.state;
    last10company = last10company.splice(last10company.length - 10);

    return last10company.map((company, index) => {
      return (
        <li key={company.id}>
          {index + 1}. {company.name}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="socialMedia">
        {/*<div className="twitter">*/}
        {/*  <TwitterTimelineEmbed*/}
        {/*    sourceType="profile"*/}
        {/*    screenName="jack"*/}
        {/*    options={{ height: 475 }}*/}
        {/*  />*/}
        {/*</div>*/}
        <CompaniesPage location={{state: [{url: "/public/companies/get-all-companies"}]}} handlePageChange={this.props.handlePageChange}/>
        {/*<div className="instagram">*/}
        {/*  <InstagramEmbed*/}
        {/*    url="https://www.instagram.com/p/BX_UqQvg9Nb/"*/}
        {/*    maxWidth={undefined}*/}
        {/*    hideCaption={true}*/}
        {/*    containerTagName="div"*/}
        {/*    protocol=""*/}
        {/*    injectScript*/}
        {/*    onLoading={() => {}}*/}
        {/*    onSuccess={() => {}}*/}
        {/*    onAfterRender={() => {}}*/}
        {/*    onFailure={() => {}}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="company10">*/}
        {/*  <h3>Last Added Companies</h3>*/}
        {/*  <ul>{this.renderlast10()}</ul>*/}
        {/*</div>*/}
      </div>
    );
  }
}
