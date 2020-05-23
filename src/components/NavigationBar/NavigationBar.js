import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

/** styles **/
import "./NavigationBar.scss";

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
    const toggle = () => this.setState({ isOpen: !isOpen });

    return (
      <div className={"NavBar"}>
        <Navbar color={"warning"} light expand="md">
          <Link to="/">
            <img
              style={{ width: "200px", height: "50px" }}
              src="https://picsum.photos/100/300"
            />
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/CategoriesPage">Categories</Link>
              </NavItem>
              <NavItem>
                <Link
                  to={{
                    pathname: "/CompaniesPage",
                    state: [
                      {
                        url: isAuthorized
                          ? "/api/companies"
                          : "/public/companies/get-all-companies",
                      },
                    ],
                  }}
                >
                  Companies
                </Link>
              </NavItem>
            </Nav>
            <div className={"col-md-1 col-sm-4 mt-sm-1 mt-md-0 "}>
              {!isAuthorized && (
                <Link to="/login" name="button" className="btn login_btn">
                  login
                </Link>
              )}
              {isAuthorized && (
                <button
                  onClick={(e) => this.logout(e)}
                  name="button"
                  className="btn login_btn"
                >
                  logout
                </button>
              )}
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
