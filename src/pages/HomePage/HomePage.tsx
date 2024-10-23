import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Welcome to the Star Wars Universe</h1>
      <p className={styles.description}>
        Explore the galaxy far, far away! Discover detailed information about
        your favorite characters, their iconic starships, and the movies they
        appear in. Dive deep into the connections and stories of the Star Wars
        universe.
      </p>
      <Link to="/characters">
        <button className={styles.button}>Start Your Journey</button>
      </Link>
    </div>
  );
};

export default HomePage;
