import React from "react";
import { Container } from "reactstrap";
import axios from "axios";

/**components */
import CompanyPageTableG from "../../CompanyPageTableG/CompanyPageTableG";

import CompanyPageProfileF from "../../CompanyProfileF/CompanyProfileF";
/** styles **/
import "./CompanyProfile.scss";
import "../../../App.scss";
class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: [],
    };
  }

  async componentDidMount() {
    const companyId = this.props.location.state[0].companyId;
    console.log(companyId);
    const response = await axios.get(
      `https://mis-422.herokuapp.com/public/companies/${companyId}`
    );
    this.setState({ companyInfo: response.data });
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
      foundersLinkedin2,
      foundersNames3,
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
    } = this.state.companyInfo;

    return (
      <div className={"CompanyProfile"}>
        <div className="companyInfo">
          <CompanyPageTableG
            companyName={name}
            id={id}
            description={description}
            website={website}
            foundationDate={foundationDate}
            headquarters={headquarters}
            otherOffices={otherOffices}
            verticalMarket1={verticalMarket1}
            vertiacalMarket2={verticalMarket2}
            verticalMarket3={verticalMarket3}
            verticalMarket4={verticalMarket4}
            verticalMarket5={verticalMarket5}
            foundersNames1={foundersNames1}
            foundersLinkedin1={foundersLinkedin1}
            foundersLinkedin2={foundersLinkedin2}
            foundersNames2={foundersNames2}
            foundersNames3={foundersNames3}
            foundersLinkedin3={foundersLinkedin3}
            foundersNames4={foundersNames4}
            foundersLinkedin4={foundersLinkedin4}
            foundersNames5={foundersNames5}
            foundersLinkedin5={foundersLinkedin5}
            nameOfTheStudentOne={nameOfTheStudentOne}
            nameOfTheStudentTwo={nameOfTheStudentTwo}
            linkedinOfTheStudentOne={linkedinOfTheStudentOne}
            linkedinOfTheStudentTwo={linkedinOfTheStudentTwo}
          />
        </div>
        <div className="graph">
          <CompanyPageProfileF />
        </div>
      </div>
    );
  }
}

export default CompanyProfile;
