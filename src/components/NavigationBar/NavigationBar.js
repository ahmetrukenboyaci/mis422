import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input
} from 'reactstrap';

/** styles **/
import './NavigationBar.scss';

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        let {isOpen} = this.state;
        const toggle = () => this.setState({ isOpen: !isOpen });

        return (
            <div className={'NavBar'}>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <div className={'col-md-3'}>
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
