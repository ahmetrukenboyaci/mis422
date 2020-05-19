import React, { Component } from "react";
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
import {Link} from "react-router-dom";
import axios from "axios";

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      timer: {},
      company: []
    };
  }

  logout = () => {
    this.props.logout();
  };

  onSearchChange = async (value) => {

    clearTimeout(this.state.timer);

    this.setState({ timer: await setTimeout(async () => {
        const axiosInstance = axios.create({
          baseURL: 'https://mis-422.herokuapp.com',
          headers: {"Content-Type": "application/json"},
          timeout: 60000,
        });
        let response = await axiosInstance.get(`https://mis-422.herokuapp.com/public/companies/${value}`);
        this.setState({ company: response.data });
      }, 500)})
  };

  render() {
    let { isAuthorized } = this.props;
    let { isOpen } = this.state;
    const toggle = () => this.setState({ isOpen: !isOpen });

    return (
      <div className={"NavBar"}>
        <Navbar color={"warning"} light expand="md">
          <NavbarBrand href="/">Logo</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/CategoriesPage">Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CompaniesPage">Companies</NavLink>
              </NavItem>
            </Nav>
            <div className={"col-md-3 col-sm-12 mt-sm-3 mt-md-0 "}>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                autoComplete="off"
                onChange={(e) => this.onSearchChange(e.target.value)}
              />
              <ul>
                <li>{this.state.company.name}</li>
              </ul>
            </div>
            <div className={"col-md-1 col-sm-12 text-center mt-sm-3 mt-md-0"}>
              <div className="d-flex justify-content-center mt-3 login_container col-md-4">
                {!isAuthorized && <Link to="/login" name="button" className="btn login_btn" >login</Link>}
                {isAuthorized && <Link onClick={(e) => this.logout(e)} to="/" name="button" className="btn login_btn" >logout</Link>}
              </div>
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
