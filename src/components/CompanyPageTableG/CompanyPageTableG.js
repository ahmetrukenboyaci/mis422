import React, { Component } from "react";

/**styles */
import "./CompanyPageTableG.scss";

/**This component is created for all users to see */

import { Container, ListGroup, ListGroupItem, Row, Col } from "reactstrap";

class CompanyPageTableG extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      companyName,
      id,
    } = this.props;

    const verticalMarkets = [
      verticalMarket1,
      verticalMarket2,
      verticalMarket3,
      verticalMarket4,
      verticalMarket5,
    ];

    const validVerticalMarkets = verticalMarkets.filter((market) => market);
    const finalMarkets = validVerticalMarkets.join(",");
    return (
      <div className={"CompanyTableG"}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Logo</th>
              <th scope="col">{companyName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Description</th>
              <td>{description}</td>
            </tr>
            <tr>
              <th scope="row">Headquarters</th>
              <td>{headquarters}</td>
            </tr>
            <tr>
              <th scope="row">Other Offices</th>
              <td>{otherOffices}</td>
            </tr>
            <tr>
              <th scope="row">Foundation Date</th>
              <td>{foundationDate}</td>
            </tr>
            <tr>
              <th scope="row">Vertical Markets</th>
              <td>{finalMarkets}</td>
            </tr>
            <tr>
              <th scope="row">Founder</th>
              <td>{foundersNames1}</td>
            </tr>
            <tr>
              <th scope="row">Founder</th>
              <td>{foundersNames2}</td>
              <td>
                <a href="">
                  <img src="" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CompanyPageTableG;
