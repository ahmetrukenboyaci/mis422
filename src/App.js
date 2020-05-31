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
import Header from "./components/Header/Header";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: getCookie("token").length > 0,
      loginVisible: false,
      header: 'DIGITAL COMPANY GURU'
    };
  }

  componentDidMount() {
    let token = getCookie("token");
    this.setState({ isAuthorized: token.length > 0 });
  }

  handlePageChange = (text='DIGITAL COMPANY GURU') => {
    this.setState({ header: text.toUpperCase() });
  };

  onClickLogin = (isOut=false) => {
    this.setState({loginVisible: !this.state.loginVisible}, () => {
      if (!this.state.loginVisible && !isOut)
        window.location.reload();
    });
  };

  logout = () => {
    setCookie("token", "", {});
    this.setState({ isAuthorized: false });
  };

  render() {
    let { isAuthorized, loginVisible, header } = this.state;
    return (
      <div className={"App"}>
        {loginVisible && <LoginPage onClick={this.onClickLogin} />}
        <BrowserRouter basename={"/"}>
          <Header title={header} />
          <NavigationBar logout={this.logout} onClickLogin={this.onClickLogin} isAuthorized={isAuthorized} />

          <div className="content">
            <Switch>
              <Route
                  exact
                  path={"/"}
                  render={(props) => (
                    <HomePage {...props} handlePageChange={this.handlePageChange} />
                  )}
              />
              <Route
                  path={"/CategoriesPage"}
                  render={(props) => (
                    <CategoriesPage {...props} handlePageChange={this.handlePageChange} />
                  )}
              />
              <Route
                  path={"/CompaniesPage"}
                  render={(props) => (
                    <CompaniesPage onClickLogin={this.onClickLogin} {...props} handlePageChange={this.handlePageChange} />
                  )}
              />
              <Route
                path={"/CompanyProfile"}
                render={(props) => (
                  <CompanyProfile
                      {...props}
                      isAuthorized={isAuthorized}
                      onClickLogin={this.onClickLogin}
                      handlePageChange={this.handlePageChange}
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
