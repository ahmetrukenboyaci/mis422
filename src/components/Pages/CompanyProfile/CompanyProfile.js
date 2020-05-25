import React from "react";
import mis422 from "../../../api/mis-422";

/**components */
import CompanyPageTableG from "../../CompanyPageTableG/CompanyPageTableG";
import FiveForces from "../../charts/five-forces/FiveForces";

import CompanyPageProfileF from "../../CompanyProfileF/CompanyProfileF";
/** styles **/
import "./CompanyProfile.scss";
import "../../../App.scss";
class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
      fiveForcesData: [],
      activeTab: true
    };
  }

  async componentDidMount() {
    console.log(this.props.isAuthorized);
    window.scroll(0, 0);
    const companyId = this.props.location.state[0].companyId;
    const api = this.props.isAuthorized ? "api" : "public";

    const response = await mis422.get(`/${api}/companies/${companyId}`);
    let fiveForcesData = {};
    if (this.props.isAuthorized) {
      fiveForcesData = await mis422.get(`/${api}/companies/${companyId}/five-forces`);
    }

    let dt = [
      { force: "Threat of New Entrants", [response.data.name]: parseInt(fiveForcesData.data.threatOfNewEntrantsValue)*10 },
      { force: "Threat of Substitute Products", [response.data.name]: parseInt(fiveForcesData.data.threatOfSubstituteProductsValue)*10 },
      { force: "Bargaining Power of Buyers", [response.data.name]: parseInt(fiveForcesData.data.bargainingPowerOfBuyersValue)*10 },
      { force: "Bargaining Power of Suppliers", [response.data.name]: parseInt(fiveForcesData.data.bargainingPowerOfSuppliersValue)*10 },
      { force: "Rivalry Among Existing Competitors", [response.data.name]: parseInt(fiveForcesData.data.rivalryAmongExistingCompetitorsValue)*10 },
    ];

    this.setState({ companyInfo: response.data, fiveForcesData: dt });
  }

  onTabClick = () => {
    this.setState({ activeTab: !this.state.activeTab });
  };

  render() {
    let { isAuthorized } = this.props;
    let { fiveForcesData, activeTab } = this.state;
    return (
      <div className={"CompanyProfile"}>
        <div className="companyInfo">
          <CompanyPageTableG
            companyInfo={this.state.companyInfo}
            isAuthorized={isAuthorized}
          />
        </div>
        <div className="graph">
          <div className={"tabs"}>
            <div onClick={this.onTabClick} className={`${activeTab && 'active'}`}>Five Forces</div>
            <div onClick={this.onTabClick} className={`${!activeTab && 'active'}`}>Swot</div>
          </div>
          {isAuthorized ?
              (activeTab ?
              <FiveForces dt={fiveForcesData} companyName={this.state.companyInfo.name} /> :
              <div>swot</div>) :
              <CompanyPageProfileF />
          }
        </div>
      </div>
    );
  }
}

export default CompanyProfile;
