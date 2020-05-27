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

  renderCompanyCard() {
    const { companyInfo } = this.props;

    let finalObject = Object.keys(companyInfo).reduce((acc, curr) => {
      let c = curr
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
        .replace(/\d+/g, "");
      if (c in acc) {
        if (companyInfo[curr] !== null) acc[c] += ",  " + companyInfo[curr];
      } else {
        if (companyInfo[curr] !== null) acc[c] = companyInfo[curr];
      }

      return acc;
    }, {});

    function isLink(item) {
      if (typeof item == "string") {
        return item.includes(".com") ? (
          <a href={item}>{item}</a>
        ) : (
          <span>{item}</span>
        );
      }
      return;
    }

    return Object.keys(finalObject).map((key, id) => {
      if (key !== "Id" && key !== "Name") {
        return (
          <tr key={id}>
            <th scope="row">{key}</th>
            <td>{isLink(finalObject[key])}</td>
          </tr>
        );
      }
    });
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
