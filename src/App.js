import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

/**  Pages  **/
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import CategoriesPage from "./components/Pages/CategoriesPage/CategoriesPage";
import CompaniesPage from "./components/Pages/CompaniesPage/CompaniesPage";
/** components **/
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";

/** styles **/
import "./App.scss";
import CompanyProfile from "./components/Pages/CompanyProfile/CompanyProfile";
import { getCookie, setCookie } from "./utils/cookie";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false,
    };
  }

  componentDidMount() {
    let token = getCookie("token");
    this.setState({ isAuthorized: token != null });
  }

  logout = () => {
    setCookie("token", "", {});
    this.setState({ isAuthorized: false });
  };

  render() {
    let { isAuthorized } = this.state;
    return (
      <div className={"App"}>
        <BrowserRouter basename={"/"}>
          <NavigationBar logout={this.logout} isAuthorized={isAuthorized} />

          <div className="content">
            <Switch>
              <Route exact path={"/login"} component={LoginPage} />
              <Route exact path={"/"} component={HomePage} />
              <Route path={"/CategoriesPage"} component={CategoriesPage} />
              <Route path={"/CompaniesPage"} component={CompaniesPage} />
              <Route
                path={"/CompanyProfile"}
                component={CompanyProfile}
                isAuthorized={isAuthorized}
              />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
