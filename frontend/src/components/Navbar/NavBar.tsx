import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LoggedinUserContext } from "../../store/loggedInUser-store";
import styles from "./NavBar.module.css";
import NavBarLoggedinView from "./NavBarLoggedinView";
import NavBarLoggedOutView from "./NavBarLoogedOutView";

interface NavBarProps {
  onSignupClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  onSignupClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {

  const loggedinUserFromContext = useContext(LoggedinUserContext).userData;

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="sm"
      sticky="top"
      className={styles.navbar}
    >
      <Container>
        <Navbar.Brand href="#home">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
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
