import styles from "./NavBar.module.css"

interface NavBarLoggedOutViewProps {
  onSignupClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoogedOutView = ({
  onSignupClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <button
        type="button"
        className={`${styles.btn} btn btn-outline-light me-2`}
        onClick={onLoginClicked}
      >
        Login
      </button>
      <button
        type="button"
        className={`${styles.btn} btn btn-warning`}
        onClick={onSignupClicked}
      >
        Sign-up
      </button>
    </>
  );
};

export default NavBarLoogedOutView;
