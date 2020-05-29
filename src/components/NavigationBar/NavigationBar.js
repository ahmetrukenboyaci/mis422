import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

/** styles **/
import "./NavigationBar.scss";
import logo from '../../resim.png';
import twitter from "../../icons/twitter.svg";
import instagram from "../../icons/instagram.svg";
import linkedin from "../../icons/linkedin.svg";
import logout from "../../icons/logout.svg";
import login from "../../icons/login.png";
import Footer from "../Footer/Footer";

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      timer: {},
      company: [],
    };
  }

  logout = () => {
    this.props.logout();
  };

  render() {
    let { isAuthorized } = this.props;
    let { isOpen } = this.state;

    return (
      <div className={"NavBar"}>
        <div className={"navbarContainer"}>
          <div className="navbarItems">
            <Link to="/">
              <img
                  src={logo}
              />
              DIGITAL COMPANY GURU
            </Link>
            <Link to="/CategoriesPage"><i data-content={"Industries"} className="fa fa-industry"/></Link>
            <Link to="/"><i data-content={"Companies"} className="fa fa-building"/></Link>
          </div>
          <div className="navbarFooter">
            <a target="_blank" href={"https://www.linkedin.com"}><i data-content={"https://www.linkedin.com"} className="fab fa-linkedin"/></a>
            <a target="_blank" href={"https://www.twitter.com"}><i data-content={"https://www.twitter.com"} className="fab fa-twitter"/></a>
            <a target="_blank" href={"https://www.instagram.com"}><i data-content={"https://www.instagram.com"} className="fab fa-instagram"/></a>
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
