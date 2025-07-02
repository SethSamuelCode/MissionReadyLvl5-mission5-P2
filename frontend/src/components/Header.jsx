import logo from "../assets/images/TrademeLogo.png";
import styles from "../components/Header.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed !== "") {
      if (!location.pathname.includes("/marketplace")) {
        navigate(`/marketplace?search=${encodeURIComponent(trimmed)}`);
      } else {
        navigate(`/marketplace?search=${encodeURIComponent(trimmed)}`, { replace: true });
        window.location.reload();
      }
    }
  };

  return (
    <header className={styles.fullHeader}>
      <div className={styles.topHeader}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Trademe Logo" />
        </Link>

        <form className={styles.searchBar} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search all of Trade me"
            className={styles.searchBarInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15.8 15.8M10.5 18C6.4 18 3 14.6 3 10.5C3 6.4 6.4 3 10.5 3C14.6 3 18 6.4 18 10.5C18 14.6 14.6 18 10.5 18Z" />
          </svg>
        </form>

        <ul className={styles.actionBar}>
          <li>
            <Link to="/catergories" className={styles.catergoryContainer}>
              <svg className={styles.catergory} xmlns="http://www.w3.org/2000/svg">
                <path d="M20 22.5H4C3.73 22.5 3.48 22.39 3.29 22.21C3.1 22.02 3 21.77 3 21.5V3.5C3 3.23 3.1 2.98 3.29 2.79C3.48 2.61 3.73 2.5 4 2.5H20C20.27 2.5 20.52 2.61 20.71 2.79C20.89 2.98 21 3.23 21 3.5V21.5C21 21.77 20.89 22.02 20.71 22.21C20.52 22.39 20.27 22.5 20 22.5ZM19 20.5V4.5H5V20.5H19ZM8 7.5H16V9.5H8V7.5ZM8 11.5H16V13.5H8V11.5ZM8 15.5H16V17.5H8V15.5Z" />
              </svg>
            Catergories
            </Link>
          </li>

          <li>

            <Link to="/watchlist" className={styles.watchlistContainer}>
              <svg className={styles.watchlist} xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_99_3696)">
                  <path d="M24.5 9V10.5H14.21C13.93 9.58 13.65 8.67 13.37 7.77C13.09 6.87 12.8 5.96 12.5 5.03C12.21 5.95 11.93 6.86 11.64 7.76C11.36 8.66 11.08 9.57 10.79 10.5H4.91C5.7 11.11 6.49 11.72 7.27 12.33C8.05 12.94 8.85 13.54 9.65 14.14C9.34 15.11 9.04 16.07 8.74 17.03C8.44 17.98 8.14 18.95 7.85 19.92L12.5 16.34V18.23L5 24L7.91 14.7L0.5 9H9.69L12.5 0L15.31 9H24.5ZM14 13.5H24.5V15H14V13.5ZM14 18H24.5V19.5H14V18Z" />
                </g>
                <defs>
                  <clipPath id="clip0_99_3696">
                    <rect width="24" height="24" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
            Watchlist
            </Link>
          </li>

          <li>
            <Link to="/favourites" className={styles.favouritesContainer}>
              <svg className={styles.favourites} xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1 8.64l-.1.1-.1-.1C10.14 6.6 7.28 6.6 5.32 8.55c-1.96 1.95-1.96 5.12 0 7.07L12 22.3l6.68-6.68c1.96-1.95 1.96-5.12 0-7.07-1.96-1.95-4.82-1.95-6.78 0z" />
              </svg>
            Favourites
             </Link>
          </li>

          <li>
            <Link to="/compare" className={styles.compareContainer}>
              <svg className={styles.compare} xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18.5H1.616C1.155 18.5 0.771 18.346 0.463 18.038C0.155 17.73 0 17.345 0 16.884V4.116C0 3.655 0.154 3.271 0.463 2.963C0.772 2.655 1.156 2.501 1.616 2.5H7V0.77C7 0.627 7.048 0.508 7.143 0.412C7.238 0.316 7.357 0.268 7.5 0.269C7.643 0.27 7.762 0.318 7.857 0.413C7.952 0.508 8 0.627 8 0.769V20.231C8 20.373 7.952 20.492 7.857 20.587C7.762 20.682 7.643 20.73 7.5 20.731C7.357 20.732 7.238 20.684 7.143 20.587C7.048 20.49 7 20.372 7 20.231V18.5ZM1 16.5H7V9.308L1 16.5ZM10 18.5V10.5L15 16.5V4.116C15 3.962 14.936 3.821 14.808 3.692C14.68 3.563 14.539 3.499 14.384 3.5H10V2.5H14.385C14.845 2.5 15.229 2.654 15.537 2.963C15.845 3.272 15.999 3.656 16 4.116V16.885C16 17.345 15.846 17.729 15.537 18.038C15.228 18.347 14.844 18.501 14.385 18.5H10Z" fill="#2F2C28" />
              </svg>
            Compare
            </Link>
          </li>

          <li>
            <Link to="https://www.trademe.co.nz/a/login" className={styles.userContainer}>
              <svg className={styles.user} xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="24" height="24" rx="12" />
                <path d="M7.734 18.5V7.047H11.68C12.57 7.047 13.25 7.102 13.719 7.211C14.375 7.362 14.935 7.635 15.398 8.031C16.003 8.542 16.453 9.195 16.75 9.992C17.052 10.784 17.203 11.69 17.203 12.711C17.203 13.581 17.102 14.352 16.898 15.023C16.695 15.695 16.435 16.253 16.117 16.695C15.799 17.133 15.451 17.479 15.07 17.734C14.695 17.984 14.24 18.175 13.703 18.305C13.172 18.435 12.56 18.5 11.867 18.5H7.734ZM9.25 17.148H11.695C12.451 17.148 13.042 17.078 13.469 16.938C13.901 16.797 14.245 16.599 14.5 16.344C14.859 15.984 15.138 15.503 15.336 14.898C15.539 14.289 15.641 13.552 15.641 12.688C15.641 11.49 15.443 10.57 15.047 9.93C14.656 9.284 14.18 8.852 13.617 8.633C13.211 8.477 12.557 8.398 11.656 8.398H9.25V17.148Z" />
              </svg>
            My Trade Me
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.bottomHeader}>
        <ul className={styles.navCatergoryTabs}>
          <li><Link to="/marketplace">Browse Marketplace</Link></li>
          <li><Link to="https://www.trademe.co.nz/a/marketplace/stores">Stores</Link></li>
          <li><Link to="https://www.trademe.co.nz/a/marketplace/search?deal_promotion_id=11">Deals</Link></li>
          <li>Book a courier</li>
        </ul>

        <div className={styles.listItem}>List an Item</div>
      </div>
    </header>
  );
};

export default Header;
