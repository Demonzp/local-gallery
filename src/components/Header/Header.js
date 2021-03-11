import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import RouteNames from '../../constants/routeNames';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <NavLink to={RouteNames.home} className="navbar-brand">
        Local Gallery
      </NavLink>
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <NavLink to={RouteNames.images} className="nav-link">
          Images
        </NavLink>
        <NavLink to={RouteNames.alboms} className="nav-link">
          Alboms
        </NavLink>
      </Nav>
    </Navbar>
  );
}