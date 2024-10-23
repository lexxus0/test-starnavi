import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
