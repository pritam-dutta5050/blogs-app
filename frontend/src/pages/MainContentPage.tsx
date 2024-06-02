import React, { useContext } from "react";
import { UserContext } from "../store/loggedInUser-store";
import LoggedOutContent from "../components/blogContent/LoggedOutContent";
import LoggedInContent from "../components/blogContent/LoggedInContent";

const MainContentPage = () => {
  const { user } = useContext(UserContext);
  return <div>{user ? <LoggedInContent /> : <LoggedOutContent />}</div>;
};

export default MainContentPage;
