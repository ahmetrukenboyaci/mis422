import React, { Component } from "react";

/**styles */
import "./CompanyPageTableG.scss";

/**This component is created for all users to see */
import linkedin from "../Footer/linkedin.svg";

class CompanyPageTableG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
    };
  }

  componentDidMount() {
    this.setState({ companyInfo: this.props.companyInfo });
  }

  render() {
    const {
      description,
      website,
      foundationDate,
      headquarters,
      otherOffices,
      verticalMarket1,
      verticalMarket2,
      verticalMarket3,
      verticalMarket4,
      verticalMarket5,
      foundersNames1,
      foundersLinkedin1,
      foundersNames2,
      foundersNames3,
      foundersLinkedin2,
      foundersLinkedin3,
      foundersNames4,
      foundersLinkedin4,
      foundersNames5,
      foundersLinkedin5,
      nameOfTheStudentOne,
      nameOfTheStudentTwo,
      linkedinOfTheStudentOne,
      linkedinOfTheStudentTwo,
      name,
      id,
      acquiredBy,
      acquiredDate,
      acquistion1,
      acquistion2,
      acquistion3,
      acquistion4,
      acquistion5,
      acquistionValue,
      businessDomain1,
      businessDomain2,
      businessModel1,
      businessModel2,
      businessModel3,
      businessModel4,
      businessModel5,
      businessModelDetail1,
      businessModelDetail2,
      businessModelDetail3,
      businessModelDetail4,
      businessModelDetail5,
      companyMaturity,
      competitorsGlobal1,
      competitorsGlobal2,
      competitorsGlobal3,
      competitorsGlobal4,
      competitorsGlobal5,
      competitorsLocal1,
      competitorsLocal2,
      competitorsLocal3,
      competitorsLocal4,
      competitorsLocal5,
      customerBase,
      lastFundingAmount,
      lastFundingDate,
      lastFundingStage,
      lastFundingStageDetail,
      lastYearRevenue,
      productName1,
      productName2,
      productName3,
      productName4,
      productName5,
      productStage,
      revenueModel1,
      revenueModel2,
      revenueModel3,
      revenueModel4,
      revenueModel5,
      revenueStage,
      totalFunding,
    } = this.props.companyInfo;
    const { isAuthorized } = this.props;

    const verticalMarkets = [
      verticalMarket1,
      verticalMarket2,
      verticalMarket3,
      verticalMarket4,
      verticalMarket5,
    ];

    console.log(this.props.companyInfo);

    const validVerticalMarkets = verticalMarkets.filter((market) => market);
    const finalMarkets = validVerticalMarkets.join(",");

    return (
      <div className={"CompanyTableG"}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <img
                  className="companyLogo"
                  src="https://picsum.photos/id/237/1000/1000"
                ></img>
              </th>
              <th scope="col" className="companyName">
                <span>{name}</span>
              </th>
            </tr>

            {}
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

export default CompanyPageTableG;
