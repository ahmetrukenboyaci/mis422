import React, { Component } from "react";

/**styles */
import "./CompanyPageTableG.scss";

/**This component is created for all users to see */

import { Container, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import linkedin from "../Footer/linkedin.svg";

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
              <th scope="col">
                <img
                  className="companyLogo"
                  src="https://picsum.photos/id/237/1000/1000"
                ></img>
              </th>
              <th scope="col" className="companyName">
                <span>{companyName}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Description</th>
              <td>{description}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Headquarters</th>
              <td>{headquarters}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Other Offices</th>
              <td>{otherOffices}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Foundation Date</th>
              <td>{foundationDate}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Vertical Markets</th>
              <td>{finalMarkets}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Founder</th>
              <td>{foundersNames1}</td>
              <td>
                <a href={foundersLinkedin1}>
                  <img src={linkedin}></img>
                </a>
              </td>
            </tr>
            {foundersNames2 && (
              <tr>
                <th scope="row">Founder</th>
                <td>{foundersNames2}</td>
                <td>
                  <a href={foundersLinkedin2}>
                    <img src={linkedin}></img>
                  </a>
                </td>
              </tr>
            )}
            {foundersNames3 && (
              <tr>
                <th scope="row">Founder</th>
                <td>{foundersNames3}</td>
                <td>
                  <a href={foundersLinkedin3}>
                    <img src={linkedin}></img>
                  </a>
                </td>
              </tr>
            )}
            {foundersNames4 && (
              <tr>
                <th scope="row">Founder</th>
                <td>{foundersNames4}</td>
                <td>
                  <a href={foundersLinkedin4}>
                    <img src={linkedin}></img>
                  </a>
                </td>
              </tr>
            )}
            {foundersNames5 && (
              <tr>
                <th scope="row">Founder</th>
                <td>{foundersNames5}</td>
                <td>
                  <a href={foundersLinkedin5}>
                    <img src={linkedin}></img>
                  </a>
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">Owner of report</th>
              <td>{nameOfTheStudentOne}</td>

              <td>
                <a href={linkedinOfTheStudentOne}>
                  <img src={linkedin}></img>
                </a>
              </td>
            </tr>
            {nameOfTheStudentTwo && (
              <tr>
                <th scope="row">Owner of report</th>
                <td>{nameOfTheStudentTwo}</td>
                <td>
                  <a href={linkedinOfTheStudentTwo}>
                    <img src={linkedin}></img>
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CompanyPageTableG;
