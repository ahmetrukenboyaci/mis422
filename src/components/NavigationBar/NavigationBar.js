import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
} from "reactstrap";

/** styles **/
import styles from "./NavigationBar.scss";

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

  onSearchChange = async (value) => {
    clearTimeout(this.state.timer);

    this.setState({
      timer: await setTimeout(async () => {
        const axiosInstance = axios.create({
          baseURL: "https://mis-422.herokuapp.com",
          headers: { "Content-Type": "application/json" },
          timeout: 60000,
        });
        let response = await axiosInstance.get(
          `https://mis-422.herokuapp.com/public/companies/${value}`
        );
        this.setState({ company: response.data });
      }, 500),
    });
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
