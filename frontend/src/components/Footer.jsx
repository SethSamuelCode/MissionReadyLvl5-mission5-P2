import React from 'react'
import styles from '../components/Footer.module.css'
import logo from '../assets/images/TrademeLogo.png'

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
        <div className={styles.topFooter}>
            <figure>
                <img className={styles.logo} src={logo} alt="" />

            </figure>
            <ul className={styles.userNavigationList}>
                <li>Catergories</li>
                <li>Watchlist</li>
                <li>Favourites</li>
                <li>Start a listing</li>
                <li>Sign Up</li>
            </ul>
        </div>

        <div className={styles.linkListContainer}>
            <div>
                <div>Marketplace</div>
                <ul>
                    <li>Latest Deals</li>
                    <li>Stores</li>
                    <li>Closing Soon</li>
                    <li>$1 Reserve</li>
                    <li>Home & Living</li>
                </ul>
            </div>

            <div>
                <div>Property</div>
                <ul>
                    <li>International Property</li>
                    <li>News & guide</li>
                    <li>Sold Properties</li>
                    <li>OneHub for Agents</li>
                    <li>Find a Real Estate Agent</li>
                </ul>
            </div>

            <div>
                <div>Motors</div>
                <ul>
                    <li>Browse All Cars</li>
                    <li>Buying & Selling</li>
                    <li>Dealer News & Info</li>
                    <li>Sell My Car</li>
                </ul>
            </div>

            <div>
                <div>Jobs</div>
                <ul>
                    <li>Browse Catergories</li>
                    <li>Careers Advice</li>
                    <li>JobSmart</li>
                    <li>Advertisers Advice</li>
                    <li>Salary Guide</li>
                </ul>
            </div>

            <div>
                <div>Services</div>
                <ul>
                    <li>Trades</li>
                    <li>Domestic Services</li>
                    <li>Events & Entertainment</li>
                    <li>Health & Wellbeing</li>
                    <li>List My Services</li>
                </ul>
            </div>

            <div>
                <div>Community</div>
                <ul>
                    <li>Help</li>
                    <li>Announcements</li>
                    <li>Trust & Saftey</li>
                    <li>Seller Information</li>
                    <li>Help Centre Community</li>
                </ul>
            </div>
        </div>
        
        <div >
            <ul className={styles.bottomFooter1}>
                <li>Trademe Insurance</li>
                <li>homes.co.nz</li>
                <li>MotorWeb</li>
                <li>Holiday Houses</li>
                <li>FindSomeone</li>
            </ul>

        </div>
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
            <figure>

            </figure>

        </div>


    </footer>
  )
}

export default Footer