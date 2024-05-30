import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className={`container ${styles.footerContainer}`}>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2024 TechieTech Company, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="https://www.twitter.com">
              <FaTwitter>
                <use xlinkHref="#twitter"></use>
                </FaTwitter>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="https://www.instagram.com">
              <FaInstagram>
                <use xlinkHref="#instagram"></use>
                </FaInstagram>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="https://www.facebook.com/profile.php?id=100094233086157">
              <FaFacebook>
                <use xlinkHref="#facebook"></use>
                </FaFacebook>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="https://github.com/pritam-techietech">
              <FaGithub>
                <use xlinkHref="https://github.com/pritam-techietech"></use>
                </FaGithub>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
