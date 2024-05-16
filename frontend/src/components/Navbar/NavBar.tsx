import { Container, Nav, Navbar } from "react-bootstrap";
import NavBarLoggedinView from "./NavBarLoggedinView";
import NavBarLoggedOutView from "./NavBarLoogedOutView";
import { UserModel } from "../../models/UserModel";

interface NavBarProps{
  onSignupClicked:()=> void;
  onLoginClicked:()=> void;
  loggedinUser: UserModel | null;
  onLogoutSuccessful: ()=> void;
}

const NavBar = ({onSignupClicked, onLoginClicked, loggedinUser, onLogoutSuccessful}: NavBarProps) => {

  /**
   * TODO: To be used with actual loggedin data
   */
  // const isLoggedIn = false;

  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedinUser ? 
            <NavBarLoggedinView User={loggedinUser} onLogoutSuccessful={onLogoutSuccessful}/> : 
            <NavBarLoggedOutView onSignupClicked={onSignupClicked} onLoginClicked={onLoginClicked}/>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
