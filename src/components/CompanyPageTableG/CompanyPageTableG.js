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
    return Object.keys(companyInfo).map(
      (key) =>
        companyInfo[key] !== null &&
        key !== "id" &&
        key !== "name" && (
          <tr key={Object.keys(companyInfo).indexOf(key)}>
            <th scope="row">{key}</th>
            <td>{companyInfo[key]}</td>
          </tr>
        )
    );
  }

  render() {
    const { name } = this.props.companyInfo;

    return (
      <div className={"CompanyTableG"}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <img
                  className="companyLogo"
                  src="https://picsum.photos/id/237/1000/1000"
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
