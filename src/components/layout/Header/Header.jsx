import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Brandin
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/">
            <NavItem eventKey={1}>
              Home
            </NavItem>
          </LinkContainer>
          <NavDropdown eventKey={2} title="Dropdown" id="nav-dropdown-menu">
            <MenuItem eventKey={2.1}>Dropdown Item</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.2}>Another one</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
