import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input
} from "reactstrap";

/** styles **/
import "./NavigationBar.scss";

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    let { isOpen } = this.state;
    const toggle = () => this.setState({ isOpen: !isOpen });

    return (
      <div className={"NavBar"}>
        <Navbar light expand="md">
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
            <div className={"col-md-3"}>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                autoComplete="off"
              />
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
