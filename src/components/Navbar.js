import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

import { useLogout } from "../Hooks/useLogout.js";
import { useAuthContext } from "../Hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <div className={styles["nav-container"]}>
        <h2>money tracker</h2>

        {!user && (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Sign Up</NavLink>
          </>
        )}

        {user && (
          <>
            <p>Hello, {user.displayName} </p>
            <button onClick={logout} className="btn">
              logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
