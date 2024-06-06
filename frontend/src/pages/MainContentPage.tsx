import { useSelector } from "react-redux";
import LoggedInContent from "../components/blogContent/LoggedInContent";
import LoggedOutContent from "../components/blogContent/LoggedOutContent";
import { RootState } from "../redux-store";

const MainContentPage = () => {
  const user = useSelector((state:RootState) => state.user).user;
  return <div>{user ? <LoggedInContent /> : <LoggedOutContent />}</div>;
};

export default MainContentPage;
