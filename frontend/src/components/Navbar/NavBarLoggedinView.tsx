import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import store, { RootState } from "../../redux-store";
import { logoutUser } from "../../redux-store/userSlice";

const NavBarLoggedinView = () => {

  const user = useSelector((state:RootState)=> state.user.user);

  async function logout() {
    store.dispatch(logoutUser());
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
