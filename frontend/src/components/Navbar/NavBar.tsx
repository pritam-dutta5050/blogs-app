import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { LoggedinUserContext } from "../../store/loggedInUser-store";
import styles from "./NavBar.module.css";
import NavBarLoggedinView from "./NavBarLoggedinView";
import NavBarLoggedOutView from "./NavBarLoogedOutView";

interface NavBarProps {
  showOffcanvasButton: boolean;
  showOffcanvasButtonClicked: () => void;
  onSignupClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  showOffcanvasButton,
  showOffcanvasButtonClicked,
  onSignupClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {

  const loggedinUserFromContext = useContext(LoggedinUserContext).userData;

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      sticky="top"
      className={styles.navbar}
    >
      <Container>
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
            {loggedinUserFromContext ? (
              <NavBarLoggedinView
                onLogoutSuccessful={onLogoutSuccessful}
              />
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
