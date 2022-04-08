import { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const NavMenu = () => {
  const [isCollapsed, setCollapsed] = useState(false)
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">To Do</NavbarBrand>
          <NavbarToggler onClick={() => setCollapsed(false)} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!isCollapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/todo">To Do</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header >
  );
}
