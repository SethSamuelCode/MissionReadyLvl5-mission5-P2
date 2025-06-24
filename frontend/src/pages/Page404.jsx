import styles from "./Page404.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page404() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <p className={styles.message}>Sorry, the page you are looking for does not exist.</p>
      </div>
      <Footer />
    </div>
  );
}
