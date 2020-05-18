import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

/**  Pages  **/
import HomePage from "./components/Pages/HomePage/HomePage";
import CategoriesPage from "./components/Pages/CategoriesPage/CategoriesPage";
import CompaniesPage from "./components/Pages/CompaniesPage/CompaniesPage";
/** components **/
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";

/** styles **/
import "./App.scss";
import CompanyProfile from "./components/Pages/CompanyProfile/CompanyProfile";

class App extends React.Component {
  render() {
    return (
      <div className={"App"}>
        <BrowserRouter basename={"/"}>
          <NavigationBar />

          <div className="content">
            <Switch>
              <Route exact path={"/"} component={HomePage}></Route>
              <Route
                path={"/CategoriesPage"}
                component={CategoriesPage}
              ></Route>
              <Route path={"/CompaniesPage"} component={CompaniesPage}></Route>
              <Route
                path={"/CompanyProfile"}
                component={CompanyProfile}
              ></Route>
            </Switch>
          </div>
        </BrowserRouter>

        <Footer />
      </div>
    );
  }
}

export default App;
