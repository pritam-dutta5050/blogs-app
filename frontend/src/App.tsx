import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/footer/Footer";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import OffCanvas from "./components/offcanvas/OffCanvas";
import Sidebar from "./components/sidebar/Sidebar";
import MainContentPage from "./pages/MainContentPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import BlogListContextProvider from "./store/blog-list-store";
import UserContextProvider from "./store/loggedInUser-store";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width:600px)" });

  console.log("App component rendered");

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
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
                />
                <Routes>
                  <Route path="/" element={<MainContentPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
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
                onSignupSuccessful={(isSuccessful) => {
                  setShowSignupModal(!isSuccessful);
                }}
              />
            )}
            {showLoginModal && (
              <LoginModal
                onDismiss={() => setShowLoginModal(false)}
                onLoginSuccessful={(isSuccessful) => {
                  setShowLoginModal(!isSuccessful);
                }}
              />
            )}
          </BlogListContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
