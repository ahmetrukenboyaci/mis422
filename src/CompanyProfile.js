import React from "react";
import { Container } from "reactstrap";

/**components */
import CompanyPageTableG from "./components/CompanyPageTableG/CompanyPageTableG";

import CompanyPageProfileF from "./components/CompanyProfileF/CompanyProfileF";
/** styles **/
import "./CompanyProfile.scss";
import "./App.scss";
class CompanyProfile extends React.Component {
  render() {
    return (
      <div className={CompanyProfile}>
        <CompanyPageTableG />
        <CompanyPageProfileF />
      </div>
    );
  }
}

export default CompanyProfile;
