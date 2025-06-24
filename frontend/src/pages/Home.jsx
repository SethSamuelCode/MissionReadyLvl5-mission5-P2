import styles from "./Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header></Header>
      <main className={styles.pageContainer}>
        <div className={styles.searchFilterContainer}>
          <form className={styles.searchBar}>
            <div className={styles.inputContainer}>
              <svg
                className={styles.searchIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-4.35-4.35m2.01-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  stroke="#6E6B66"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input type="text" placeholder="Search" />
            </div>
            <button type="submit">Search</button>
          </form>
          <div>

             <div className={styles.container}>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Home and Living</button>
        <button className={styles.tab}>Office</button>
        <button className={styles.tab}>Kitchen</button>
        <button className={styles.tab}>Outdoor/Garden</button>
        <button className={styles.tab}>All Category</button>
      </div>

      <div className={styles.filters}>
        <select><option>Search by</option></select>
        <select><option>Location</option></select>
        <select><option>Condition</option></select>
        <select><option>Payment</option></select>
        <select><option>Shipping</option></select>
        <select><option>Price</option></select>
        <select><option>Clearance</option></select>
        <div className={styles.searchField}>
          <input type="text" placeholder="Search Keywords....." />
          <span className={styles.searchIcon}>🔍</span>
        </div>
        <button className={styles.searchBtn}>Search</button>
      </div>
    </div>

          </div>
          <div className={styles.catergoryListContainer}>
            <ul>
              <li>Bathroom</li>
              <li>Cleaning Bin</li>
              <li>Curtains</li>
              <li>Bedframe</li>
              <li>Lamp</li>
            </ul>
            <ul>
              <li>Laundry</li>
              <li>Storage</li>
              <li>Travel</li>
              <li>Table</li>
              <li>Kitchen</li>
            </ul>
            <ul>
              <li>Heating & Cooling</li>
              <li>Home Decor</li>
              <li>Art Posters</li>
              <li>Cleaning</li>
              <li>Mats & Rugs</li>
            </ul>
            <ul>
              <li>Outdoor</li>
              <li>Clock</li>
              <li>Utensils</li>
              <li>Office</li>
              <li>Blanket</li>
            </ul>
          </div>
        </div>
        <div></div>
        <div></div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Home;
