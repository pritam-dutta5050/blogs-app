import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { UserModel } from "../../models/UserModel";
import * as BlogsApi from "../../network/blogs_api";

interface LoggedInViewProps{
  User: UserModel,
  onLogoutSuccessful: () => void,
}
const NavBarLoggedinView = ({User, onLogoutSuccessful}:LoggedInViewProps) => {
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
      <Navbar.Text className="me-2">Logged in as : {User.firstName} {User.lastName}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default NavBarLoggedinView;
