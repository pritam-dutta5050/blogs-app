
import { useState } from "react";
import { NavLink } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 text-bg-dark ${styles.sidebarContainer}`}
    >
      <NavLink
        as={Link}
        to={"/"}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4"><br/></span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            as={Link}
            to={"/"}
            className={`nav-link ${selectedTab === "Home" && "active"}`}
            onClick={() => setSelectedTab("Home")}
            aria-current="page"
          >
            <IoHome className="me-2"></IoHome>Blogs
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            as={Link}
            to={"/profile"}
            className={`nav-link ${selectedTab === "Profile" && "active"}`}
            onClick={() => setSelectedTab("Profile")}
            aria-current="page"
          >
            <CgProfile className="me-2"></CgProfile>
            Profile
          </NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink
            as={Link}
            to={"/friends"}
            className={`nav-link ${selectedTab === "Friends" && "active"}`}
            onClick={() => setSelectedTab("Friends")}
            aria-current="page"
          >
            <FaUserFriends className="me-2"></FaUserFriends>
            Friends
          </NavLink>
          </li>
        <li className="nav-item">
          <NavLink
            as={Link}
            to={"/settings"}
            className={`nav-link ${selectedTab === "Settings" && "active"}`}
            onClick={() => setSelectedTab("Settings")}
            aria-current="page"
          >
            <IoSettingsOutline className="me-2"></IoSettingsOutline>
            Settings
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;
