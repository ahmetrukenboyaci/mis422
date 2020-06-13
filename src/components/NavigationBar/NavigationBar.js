import React, { Component } from "react";
import { Link } from "react-router-dom";

/** styles **/
import "./NavigationBar.scss";
import logo from "../../resim.png";
import Footer from "../Footer/Footer";

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: {},
      company: [],
    };
  }

  logout = () => {
    this.props.logout();
  };

  render() {
    let { isAuthorized } = this.props;

    return (
      <div className={"NavBar"}>
        <div className={"navbarContainer"}>
          <div className="navbarItems">
            <Link to="/">
              <img alt={"logo"} src={logo} />
              DIGITAL COMPANY GURU
            </Link>
            <Link to="/CategoriesPage">
              <i data-content={"Industries"} className="fa fa-industry" />
            </Link>
            <Link to="/">
              <i data-content={"Companies"} className="fa fa-building" />
            </Link>
          </div>
          <div className="navbarFooter">
            <a target="_blank" rel="noopener noreferrer" href={"https://www.linkedin.com/in/digital-company-guru"}>
              <i
                data-content={"https://www.linkedin.com/in/digital-company-guru"}
                className="fab fa-linkedin"
              />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={"https://twitter.com/digitalcomguru"}>
              <i
                data-content={"https://twitter.com/digitalcomguru"}
                className="fab fa-twitter"
              />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={"https://instagram.com/digitalcompanyguru"}>
              <i
                data-content={"https://instagram.com/digitalcompanyguru"}
                className="fab fa-instagram"
              />
            </a>
            <div className="lineBottom" />
            {!isAuthorized && (
              <i
                onClick={() => this.props.onClickLogin()}
                className="fas fa-sign-in-alt"
                data-content={"Sign In"}
              />
            )}
            {isAuthorized && (
              <i
                onClick={(e) => this.logout(e)}
                className="fas fa-sign-out-alt"
                data-content={"Sign Out"}
              />
            )}
            <div className="lineBottom" />
            <div className="bound">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
