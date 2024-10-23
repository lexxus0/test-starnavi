import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navigation.module.css";
import { IoHome } from "react-icons/io5";

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.activeLink)
        }
        to="/"
      >
        <IoHome />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.activeLink)
        }
        to="/characters"
      >
        Characters
      </NavLink>
    </nav>
  );
};

export default Navigation;
