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
import info from "../../../icons/info.svg";
import swot from "../../../icons/categories.svg";
import arrowdown from "../../../icons/arrow-down.svg";
import arrowleft from "../../../icons/arrow-left.svg";
import arrowright from "../../../icons/arrow-right.svg";
import arrowup from "../../../icons/arrow-up.svg";
import fiveCore from "../../../icons/fiveCore.svg";

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
      fiveForcesData: [],
      activeTab: -1,
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
      fiveForcesData = await mis422.get(`/${api}/companies/${companyId}/five-forces`);
      swotData = await mis422.get(`/${api}/companies/${companyId}/swot`);
      swotData = swotData.data;
    }

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

  onTabClick = (i) => {
    let {activeTab} = this.state;
    if (activeTab !== i)
      this.setState({ activeTab: i });
  };

  render() {
    let { isAuthorized } = this.props;
    let { fiveForcesData, activeTab, swotData } = this.state;
    return (
      <div style={{width: "100%", height:"100vh", display:"flex", justifyContent: "center"}}>
        {this.state.loading ? (
          <div style={{alignSelf: "center"}}>
            <div className="spinner-grow text-primary" role="status"/>
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
            {!isAuthorized && <div className="companyInfo col-12">
              <div className={!isAuthorized ? "col-6" : "col-6 md-auto"}>
                <CompanyPageTableG
                  companyInfo={this.state.companyInfo}
                  isAuthorized={isAuthorized}
                />
              </div>
              <div className="col-6">
                 <CompanyPageProfileF onClickLogin={this.props.onClickLogin} swot={true}/>
                 <CompanyPageProfileF onClickLogin={this.props.onClickLogin} swot={false}/>
              </div>
            </div>}
            {isAuthorized &&
              <div className="graph">
                <div className={"tabs"}>
                  <div
                    onClick={()=>this.onTabClick(-1)}
                    className={`tab ${activeTab === -1 && "active"}`}
                  >
                    <img src={info} />
                    Company Detail
                  </div>
                  <div
                    onClick={()=>this.onTabClick(0)}
                    className={`tab ${activeTab === 0 && "active"}`}
                    style={{  position: "relative", display: "flex", justifyContent: "space-between",width: "200px", paddingLeft: "70px"}}
                  >
                    <div className="fiveForceTab">
                      <div className="fiveForceIcon">
                        <img className={"arrowup"} src={arrowup} />
                        <img className={"arrowright"} src={arrowright} />
                        <img className={"arrowdown"} src={arrowdown} />
                        <img className={"arrowleft"} src={arrowleft} />
                        <img className={"fiveCore"} src={fiveCore} />
                      </div>
                    </div>
                    Five Forces
                  </div>
                  <div
                    onClick={()=>this.onTabClick(1)}
                    className={`tab ${activeTab === 1 && "active"}`}
                  >
                    <img src={swot} />
                    SWOT Chart
                  </div>
                </div>
                {activeTab === -1 && <CompanyPageTableG
                    companyInfo={this.state.companyInfo}
                    isAuthorized={isAuthorized}
                />}
                {activeTab === 0 && <FiveForces
                    dt={fiveForcesData}
                    data={this.state.fiveForcesFullData.data}
                    companyNames={[this.state.companyInfo.name]}
                />}
                {activeTab === 1 && <Swot
                    data={swotData}
                />}
              </div>
            }
          </div>
        )}
      </div>
    );
  }
}

export default CompanyProfile;
