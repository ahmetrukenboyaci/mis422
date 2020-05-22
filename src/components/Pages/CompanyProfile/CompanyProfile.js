import React from "react";
import axios from "axios";
import { getCookie } from "../../../utils/cookie";

/**components */
import CompanyPageTableG from "../../CompanyPageTableG/CompanyPageTableG";

import CompanyPageProfileF from "../../CompanyProfileF/CompanyProfileF";
/** styles **/
import "./CompanyProfile.scss";
import "../../../App.scss";
class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
    };
  }

  async componentDidMount() {
    window.scroll(0, 0);
    const companyId = this.props.location.state[0].companyId;
    const api = this.props.isAuthorized ? "api" : "public";

    const response = await axios.get(
      `https://mis-422.herokuapp.com/${api}/companies/${companyId}`,
      {
        headers: { authorization: "Bearer" + " " + getCookie("token") },
      }
    );

    this.setState({ companyInfo: response.data });
  }

  render() {
    let { isAuthorized } = this.props;
    return (
      <div className={"CompanyProfile"}>
        <div className="companyInfo">
          <CompanyPageTableG
            companyInfo={this.state.companyInfo}
            isAuthorized={isAuthorized}
          />
        </div>
        <div className="graph">
          <CompanyPageProfileF />
        </div>
      </div>
    );
  }
}

export default CompanyProfile;
