import { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { UserContext } from "../../store/loggedInUser-store";

const NavBarLoggedinView = () => {

  const {user, logoutUser} = useContext(UserContext);

  async function logout() {
   logoutUser();
}
  return (
    <>
      <Navbar.Text className="me-2">Logged in as : {user?.firstName} {user?.lastName}</Navbar.Text>
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
