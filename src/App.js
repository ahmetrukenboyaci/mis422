import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

/**  pages  **/
import CategoriesPage from "./CategoriesPage";
import CompaniesPage from "./CompaniesPage";
/** components **/
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";

/** styles **/
import "./App.scss";
import CompanyProfile from "./CompanyProfile";

class App extends React.Component {
  render() {
    return (
      <div className={"App"}>
        <BrowserRouter basename={"/"}>
          <NavigationBar />
          <Switch>
            <Route path={"/CategoriesPage"} component={CategoriesPage}></Route>
            <Route path={"/CompaniesPage"} component={CompaniesPage}></Route>
            <Route path={"/CompanyProfile"} component={CompanyProfile}></Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
