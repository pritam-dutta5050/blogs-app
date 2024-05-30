import { useContext } from "react";
import { Navbar } from "react-bootstrap";
import * as BlogsApi from "../../network/blogs_api";
import { LoggedinUserContext } from "../../store/loggedInUser-store";

interface LoggedInViewProps{
  onLogoutSuccessful: () => void,
}
const NavBarLoggedinView = ({onLogoutSuccessful}:LoggedInViewProps) => {

  const loggedinUserFromContext = useContext(LoggedinUserContext).userData;

  async function logout() {
    try {
        await BlogsApi.logoutUser();
        onLogoutSuccessful();
    } catch (error) {
        console.log(error);
        alert(error);
    }
}
  return (
    <>
      <Navbar.Text className="me-2">Logged in as : {loggedinUserFromContext?.firstName} {loggedinUserFromContext?.lastName}</Navbar.Text>
      {/* <Button onClick={logout}>Logout</Button> */}
      <button
        type="button"
        className="btn btn-warning"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

export default NavBarLoggedinView;
