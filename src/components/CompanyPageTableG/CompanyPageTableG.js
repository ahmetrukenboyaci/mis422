import React, { Component } from "react";

/**styles */
import "./CompanyPageTableG.scss";

/**This component is created for all users to see */

class CompanyPageTableG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
    };
  }

  keysMap = {
    description: "Description",
    website: "Web Site",
    foundationDate: "Foundation Date",
    headquarters: "Headquarters",
    otherOffices: "Other Offices",
    verticalMarket1: "Vertical Market",
    foundersNames1: "Founder",
  };
  renameKeys = (keysMap, obj) =>
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );

  renderCompanyCard() {
    const { companyInfo } = this.props;

    const eren = this.renameKeys(this.keysMap, companyInfo);

    return Object.keys(eren).map(
      (key) =>
        eren[key] !== null &&
        key !== "id" &&
        key !== "name" && (
          <tr key={Object.keys(eren).indexOf(key)}>
            <th scope="row">{key}</th>
            <td>{eren[key]}</td>
          </tr>
        )
    );
  }

  render() {
    const { name, website } = this.props.companyInfo;

    return (
      <div className={"CompanyTableG"}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <img
                  className="companyLogo"
                  src={`https://logo.clearbit.com/${website}?size=200`}
                />
              </th>
              <th scope="col" className="companyName">
                <span>{name}</span>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderCompanyCard()}</tbody>
        </table>
      </div>
    );
  }
}

export default CompanyPageTableG;
