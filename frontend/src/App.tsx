// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LoggedInContent from "./components/Content/LoggedInContent";
import LoggedOutContent from "./components/Content/LoggedOutContent";
import NavBar from "./components/Navbar/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import SignupModal from "./components/modals/SignupModal";
import { useEffect, useState } from "react";
import LoginModal from "./components/modals/LoginModal";
import { UserModel } from "./models/UserModel";
import * as BlogsApi from "./network/blogs_api";

function App() {
  const [loggedinUser, setLoggedinUser] = useState<UserModel | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  console.log("App component rendered");
  useEffect(() => {
    async function fetchLoggedinUser() {
      try {
        const user = await BlogsApi.getloggedinUser();
        setLoggedinUser(user);
      } catch (error) {
        console.log("Error in fetching loggedin user");
        console.error(error);
      }
    }
    fetchLoggedinUser();
  }, []);

  return (
    <>
      <NavBar
        onSignupClicked={() => setShowSignupModal(true)}
        onLoginClicked={() => setShowLoginModal(true)}
        loggedinUser={loggedinUser}
        onLogoutSuccessful={() => setLoggedinUser(null)}
      />

      <div className="m-auto">
        {loggedinUser && loggedinUser._id ? (
          <LoggedInContent userId={loggedinUser._id} />
        ) : (
          <LoggedOutContent />
        )}
      </div>

      {showSignupModal && (
        <SignupModal
          onDismiss={() => setShowSignupModal(false)}
          onSignupSuccessful={(user) => {
            setLoggedinUser(user);
            setShowSignupModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedinUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
