import React from "react";
import mis422 from "../../../api/mis-422";

/**components */
import CompanyPageTableG from "../../CompanyPageTableG/CompanyPageTableG";
import FiveForces from "../../charts/five-forces/FiveForces";
import Swot from "../../charts/swot/Swot";
import newsData from '../../../utils/newsData';


import CompanyPageProfileF from "../../CompanyProfileF/CompanyProfileF";
/** styles **/
import "./CompanyProfile.scss";
import "../../../App.scss";
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
      news: [],
    };
  }

   asd = (word) => {
    return word
        .replace('Ğ','g')
        .replace('Ü','u')
        .replace('Ş','s')
        .replace('I','i')
        .replace('İ','i')
        .replace('Ö','o')
        .replace('Ç','c')
        .replace('ğ','g')
        .replace('ü','u')
        .replace('ş','s')
        .replace('ı','i')
        .replace('ö','o')
        .replace('ç','c');
  };

  async componentDidMount() {
    const companyId = this.props.location.state[0].companyId;
    const api = this.props.isAuthorized ? "api" : "public";

    const response = await mis422.get(`/${api}/companies/${companyId}`);

    this.props.handlePageChange(response.data.name);
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
      news: newsData.find(e => this.asd(e.companyName.toLowerCase()).includes(response.data.name.toLowerCase()))
    });
    window.scroll(0, 0);
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
    let { fiveForcesData, activeTab, swotData, news } = this.state;
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
                 <CompanyPageProfileF onClickLogin={this.props.onClickLogin || this.props.location.state[0]?.onClickLogin} swot={true}/>
                 <CompanyPageProfileF onClickLogin={this.props.onClickLogin || this.props.location.state[0]?.onClickLogin} swot={false}/>
              </div>
            </div>}
            {isAuthorized &&
              <div className="graph">
                <div className={"tabs"}>
                  <div
                    onClick={()=>this.onTabClick(-1)}
                    className={`tab ${activeTab === -1 && "active"}`}
                  >
                    <i className={'fas fa-info'} />
                    Company Detail
                  </div>
                  <div
                    onClick={()=>this.onTabClick(0)}
                    className={`tab ${activeTab === 0 && "active"}`}
                  >
                    <i className={'fa fa-dice-five'} />
                    Five Forces
                  </div>
                  <div
                    onClick={()=>this.onTabClick(1)}
                    className={`tab ${activeTab === 1 && "active"}`}
                  >
                    <i className={'fa fa-dice-four'} />
                    SWOT Chart
                  </div>
                  <div
                    onClick={()=>this.onTabClick(2)}
                    className={`tab ${activeTab === 2 && "active"}`}
                  >
                    <i className={'fa fa-newspaper'} />
                    Recent News
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
                {activeTab === 2 &&
                  news?.newsDetails.map((e, i) =>
                      <div key={i} className={"newsContainer"}>
                        {e.url.length > 0 && <a target={"_blank"} href={e.url} rel="noopener noreferrer" className={"url"}>
                          Link
                        </a>}
                        <div className={"title"}>
                          {e.title}
                        </div>
                        <div className={"shortContent"}>
                          {e['short-content']}
                        </div>
                        <div className={"date"}>
                          {e.date.toUpperCase()}
                        </div>
                      </div>
                  )
                }
              </div>
            }
          </div>
        )}
      </div>
    );
  }
}

export default CompanyProfile;
