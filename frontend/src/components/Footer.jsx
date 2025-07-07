import React from "react";
import { Link } from "react-router-dom";
import styles from "../components/Footer.module.css";
import logo from "../assets/images/TrademeLogo.png";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      
      {/* Top section of footer: logo and user navigation icons */}
      <div className={styles.topFooter}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="TrademeLogo" />
        </Link>

        <ul className={styles.userNavigationList}>
          <li>

            {/* Link to categories with SVG icon */}
            <Link to="/catergories" className={styles.catergoryContainer}>
              <svg className={styles.catergory} xmlns="http://www.w3.org/2000/svg">
                <path d="M20 22.5H4C3.73 22.5 3.48 22.39 3.29 22.21C3.1 22.02 3 21.77 3 21.5V3.5C3 3.23 3.1 2.98 3.29 2.79C3.48 2.61 3.73 2.5 4 2.5H20C20.27 2.5 20.52 2.61 20.71 2.79C20.89 2.98 21 3.23 21 3.5V21.5C21 21.77 20.89 22.02 20.71 22.21C20.52 22.39 20.27 22.5 20 22.5ZM19 20.5V4.5H5V20.5H19ZM8 7.5H16V9.5H8V7.5ZM8 11.5H16V13.5H8V11.5ZM8 15.5H16V17.5H8V15.5Z" />
              </svg>
              Catergories
            </Link>
          </li>
          <li>

            {/* Link to watchlist with SVG icon */}
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

            {/* Link to favourites with SVG icon */}
            <Link to="/favourites" className={styles.favouritesContainer}>
              <svg className={styles.favourites} xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1 8.64l-.1.1-.1-.1C10.14 6.6 7.28 6.6 5.32 8.55c-1.96 1.95-1.96 5.12 0 7.07L12 22.3l6.68-6.68c1.96-1.95 1.96-5.12 0-7.07-1.96-1.95-4.82-1.95-6.78 0z" />
              </svg>
              Favourites
            </Link>
          </li>
          <li>

            {/* Link to start listing page with SVG icon */}
            <Link to="/start-listing" className={styles.listingContainer}>
              <svg className={styles.listing} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04c.19-.19.29-.44.29-.71s-.1-.52-.29-.71l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.82z" />
              </svg>
              Start a listing
            </Link>
          </li>
          <li>

            {/* Link to signup page with SVG icon */}
            <Link to="https://www.trademe.co.nz/a/register" className={styles.signupContainer}>
              <svg className={styles.signup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>

      {/* Category sections with sub-links */}
      <div className={styles.linkListContainer}>

        {/* Marketplace */}
        <div>
          <Link className={styles.BoldLinks} to="/marketplace">Marketplace</Link>
          <ul>
            <li>Latest Deals</li>
            <li>Stores</li>
            <li>Closing Soon</li>
            <li>$1 Reserve</li>
            <li>Home & Living</li>
          </ul>
        </div>

        {/* Property */}
        <div>
          <Link className={styles.BoldLinks} to="/property">Property</Link>
          <ul>
            <li>International Property</li>
            <li>News & guide</li>
            <li>Sold Properties</li>
            <li>OneHub for Agents</li>
            <li>Find a Real Estate Agent</li>
          </ul>
        </div>

        {/* Motors */}
        <div>
          <Link className={styles.BoldLinks} to="/motors">Motors</Link>
          <ul>
            <li>Browse All Cars</li>
            <li>Buying & Selling</li>
            <li>Dealer News & Info</li>
            <li>Sell My Car</li>
          </ul>
        </div>

        {/* Jobs */}
        <div>
          <Link className={styles.BoldLinks} to="/jobs">Jobs</Link>
          <ul>
            <li>Browse Catergories</li>
            <li>Careers Advice</li>
            <li>JobSmart</li>
            <li>Advertisers Advice</li>
            <li>Salary Guide</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <Link className={styles.BoldLinks} to="/services">Services</Link>
          <ul>
            <li>Trades</li>
            <li>Domestic Services</li>
            <li>Events & Entertainment</li>
            <li>Health & Wellbeing</li>
            <li>List My Services</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <Link className={styles.BoldLinks} to="/community">Community</Link>
          <ul>
            <li>Help</li>
            <li>Announcements</li>
            <li>Trust & Saftey</li>
            <li>Seller Information</li>
            <li>Help Centre Community</li>
          </ul>
        </div>
      </div>

      {/* Partner links */}
      <div>
        <ul className={styles.bottomFooter1}>
          <li><Link to="https://www.trademeinsurance.co.nz/">Trademe Insurance</Link></li>
          <li><Link to="https://homes.co.nz/">homes.co.nz</Link></li>
          <li><Link to="https://www.motorweb.co.nz/pub/">MotorWeb</Link></li>
          <li><Link to="https://www.holidayhouses.co.nz/">Holiday Houses</Link></li>
          <li><Link to="https://findsomeone.co.nz/">FindSomeone</Link></li>
        </ul>
      </div>

      {/* Footer bottom bar with links and social icons */}
      <div className={styles.bottomFooter2}>
        <div>&copy;2025 Trademe Limited</div>
        <ul className={styles.bottomFooter2List}>
          <li>Desktop Site</li>
          <li>About Us</li>
          <li>Careers</li>
          <li>Advertise</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Contact Us</li>
        </ul>

        {/* Social media icons */}
        <figure className={styles.socialIcons}>

          {/* Instagram */}
          <Link to="https://www.instagram.com/trademe_nz/?hl=en">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .3 2.5.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.3.5 2.5.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2-.5 2.5-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.2-1.3.4-2.5.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.3-2.5-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.5-.4-1.3-.5-2.5-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-2 .5-2.5.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .5-.2 1.3-.4 2.5-.5 1.2-.1 1.6-.1 4.8-.1m0-2.2C8.7 0 8.3 0 7.1.1 5.9.2 4.9.4 4.2.7c-.8.3-1.5.7-2.1 1.3C1.5 2.6 1.1 3.3.8 4.1c-.3.7-.6 1.7-.7 2.9C0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.1 1.2.4 2.1.7 2.9.3.8.7 1.5 1.3 2.1.6.6 1.3 1 2.1 1.3.7.3 1.7.6 2.9.7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.2-.1 2.1-.4 2.9-.7.8-.3 1.5-.7 2.1-1.3.6-.6 1-1.3 1.3-2.1.3-.7.6-1.7.7-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.2-.4-2.1-.7-2.9-.3-.8-.7-1.5-1.3-2.1C22.6 1.5 21.9 1.1 21.1.8c-.7-.3-1.7-.6-2.9-.7C15.7 0 15.3 0 12 0z" />
              <path d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zM18.4 4.6c-.8 0-1.4.6-1.4 1.4s.6 1.4 1.4 1.4 1.4-.6 1.4-1.4-.6-1.4-1.4-1.4z" />
            </svg>
          </Link>

          {/* Facebook */}
          <Link to="https://www.facebook.com/TradeMe/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h10V14h-3v-4h3V7c0-3 2-5 5-5h3v4h-2c-1 0-1 .4-1 1v3h3l-1 4h-2v10h4c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link to="https://www.linkedin.com/company/trade-me/?originalSubdomain=nz">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-9h3v1.265c.738-1.066 2.219-1.265 3.078-1.265 2.156 0 3.922 1.766 3.922 3.922v5.078z" />
            </svg>
          </Link>
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
