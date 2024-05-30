import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoggedInContent from "./components/Content/LoggedInContent";
import LoggedOutContent from "./components/Content/LoggedOutContent";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/footer/Footer";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import OffCanvas from "./components/offcanvas/OffCanvas";
import Sidebar from "./components/sidebar/Sidebar";
import { UserModel } from "./models/UserModel";
import * as BlogsApi from "./network/blogs_api";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import BlogListContextProvider from "./store/blog-list-store";
import { LoggedinUserContext } from "./store/loggedInUser-store";

function App() {
  const [loggedinUser, setLoggedinUser] = useState<UserModel | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width:600px)" });

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
      <BrowserRouter>
        <LoggedinUserContext.Provider value={{ userData: loggedinUser }}>
          <BlogListContextProvider>
            <div className="d-flex">
              {!isSmallScreen ? (
                <Sidebar />
              ) : (
                <OffCanvas
                  showOffcanvas={showOffcanvas}
                  hideOffcanvas={() => setShowOffcanvas(false)}
                />
              )}
              <div className="w-100">
                <NavBar
                  showOffcanvasButton={isSmallScreen}
                  showOffcanvasButtonClicked={() => setShowOffcanvas(true)}
                  onSignupClicked={() => setShowSignupModal(true)}
                  onLoginClicked={() => setShowLoginModal(true)}
                  onLogoutSuccessful={() => setLoggedinUser(null)}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      loggedinUser ? <LoggedInContent /> : <LoggedOutContent />
                    }
                  />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/*" element={<NotFoundPage />} />
                </Routes>

                <Footer />
              </div>
            </div>
            {/* <div className="d-flex">
          <div className="d-flex flex-column contentContainer">
            {loggedinUser ? <LoggedInContent /> : <LoggedOutContent />}
            <Footer />
          </div>
        </div> */}

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
          </BlogListContextProvider>
        </LoggedinUserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
