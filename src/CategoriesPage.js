import React from "react";

/** components **/

import CategoryTable from "./components/CategoryTable/CategoryTable";

/** styles **/
import "./CategoriesPage.scss";
import "./App.scss";
class CategoriesPage extends React.Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6">
            <p>Category Name</p>
            <CategoryTable />
          </div>
          <div className="col-6">
            <p>Category Name</p>
            <CategoryTable />
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesPage;
