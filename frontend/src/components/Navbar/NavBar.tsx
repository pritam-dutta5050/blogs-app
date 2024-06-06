import { Container, Nav, Navbar } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux-store";
import NavBarLoggedinView from "./NavBarLoggedinView";
import NavBarLoggedOutView from "./NavBarLoogedOutView";

interface NavBarProps {
  showOffcanvasButton: boolean;
  showOffcanvasButtonClicked: () => void;
  onSignupClicked: () => void;
  onLoginClicked: () => void;
}

const NavBar = ({
  showOffcanvasButton,
  showOffcanvasButtonClicked,
  onSignupClicked,
  onLoginClicked,
}: NavBarProps) => {

  const user = useSelector((state:RootState)=>state.user.user);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      sticky="top"
    >
      <Container >
      {showOffcanvasButton && (
              <li
                className="nav-link px-2 text-white"
                onClick={showOffcanvasButtonClicked}
              >
                <MdMenu />
              </li>
            )}
        {/* <Navbar.Brand href="#home">Blog App</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile">Link</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <NavBarLoggedinView/>
            ) : (
              <NavBarLoggedOutView
              onSignupClicked={onSignupClicked}
              onLoginClicked={onLoginClicked}
              />
            )}
          </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
