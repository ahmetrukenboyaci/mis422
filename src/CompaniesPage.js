import React from "react";

/**  pages  **/

/** components **/

import CompanyCard from "./components/CompanyCard/CompanyCard";

/** styles **/
import "./CompaniesPage.scss";
import "./App.scss";
class CompaniesPage extends React.Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-3">
            <CompanyCard />
          </div>
          <div className="col-3">
            <CompanyCard />
          </div>
          <div className="col-3">
            <CompanyCard />
          </div>
          <div className="col-3">
            <CompanyCard />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-3">
            <CompanyCard />
          </div>
        </div>
      </div>
    );
  }
}

export default CompaniesPage;
