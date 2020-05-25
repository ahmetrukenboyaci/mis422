import React from "react";
import mis422 from "../../../api/mis-422";

/**components */
import CompanyPageTableG from "../../CompanyPageTableG/CompanyPageTableG";
import FiveForces from "../../charts/five-forces/FiveForces";
import Swot from "../../charts/swot/Swot";

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
      activeTab: true,
      loading: true,
      fiveForcesFullData: {},
      swotData: [],
    };
  }

  async componentDidMount() {
    window.scroll(0, 0);
    const companyId = this.props.location.state[0].companyId;
    const api = this.props.isAuthorized ? "api" : "public";

    const response = await mis422.get(`/${api}/companies/${companyId}`);
    let fiveForcesData = {};
    let swotData = [];
    if (this.props.isAuthorized) {
      fiveForcesData = await mis422.get(
        `/${api}/companies/${companyId}/five-forces`
      );
      swotData = await mis422.get(`/${api}/companies/${companyId}/swot`);
      swotData = swotData.data;
    }

    console.log(Object.values(swotData));

    if (this.props.isAuthorized === true) {
      let dt = [
        {
          force: "Threat of New Entrants",
          [response.data.name]:
            fiveForcesData.data.threatOfNewEntrantsValue * 10,
        },
        {
          force: "Threat of Substitute Products",
          [response.data.name]:
            fiveForcesData.data.threatOfSubstituteProductsValue * 10,
        },
        {
          force: "Bargaining Power of Buyers",
          [response.data.name]:
            fiveForcesData.data.bargainingPowerOfBuyersValue * 10,
        },
        {
          force: "Bargaining Power of Suppliers",
          [response.data.name]:
            fiveForcesData.data.bargainingPowerOfSuppliersValue * 10,
        },
        {
          force: "Rivalry Among Existing Competitors",
          [response.data.name]:
            fiveForcesData.data.rivalryAmongExistingCompetitorsValue * 10,
        },
      ];
      // let newData = swotData.data.map((item, index) => {
      //   return {
      //     item: Object.keys(item)[index],
      //   };
      // });
      this.setState({
        fiveForcesData: dt,
        fiveForcesFullData: fiveForcesData,
      });
    }

    this.setState({
      companyInfo: response.data,
      loading: false,
      swotData: swotData,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isAuthorized !== this.props.isAuthorized) {
      const companyId = this.props.location.state[0].companyId;
      const api = this.props.isAuthorized ? "api" : "public";

      const response = await mis422.get(`/${api}/companies/${companyId}`);

      this.setState({ companyInfo: response.data });
    }
  }

  onTabClick = () => {
    this.setState({ activeTab: !this.state.activeTab });
  };

  render() {
    let { isAuthorized } = this.props;
    let { fiveForcesData, activeTab, swotData } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <div>
            <div className="spinner-grow text-primary" role="status"></div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className={"CompanyProfile"}>
            <div className="companyInfo">
              <CompanyPageTableG
                companyInfo={this.state.companyInfo}
                isAuthorized={isAuthorized}
              />
            </div>
            <div className="graph">
              <div className={"tabs"}>
                <div
                  onClick={this.onTabClick}
                  className={`${activeTab && "active"}`}
                >
                  Five Forces
                </div>

                <div
                  onClick={this.onTabClick}
                  className={`${!activeTab && "active"}`}
                >
                  Swot
                </div>
              </div>
              {isAuthorized ? (
                activeTab ? (
                  <FiveForces
                    dt={fiveForcesData}
                    data={this.state.fiveForcesFullData.data}
                    companyName={this.state.companyInfo.name}
                  />
                ) : (
                  <Swot data={swotData} />
                )
              ) : (
                <CompanyPageProfileF />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CompanyProfile;
