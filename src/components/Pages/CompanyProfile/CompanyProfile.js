import React from "react";
import mis422 from "../../../api/mis-422";

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

    const response = await mis422.get(`/${api}/companies/${companyId}`);

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
