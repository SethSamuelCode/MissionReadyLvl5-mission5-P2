import React from 'react'
import styles from './Watchlist.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const dummyItems = [
  {
    id: 1,
    title: 'Double bed 1',
    description: 'Description',
    location: 'North shore',
    closingTime: 'Fri 13th July, 4:19pm',
    price: '$1,200',
  },
  {
    id: 2,
    title: 'Double bed 2',
    description: 'Description',
    location: 'North shore',
    closingTime: 'Fri 13th July, 4:19pm',
    price: '$800',
  },
  {
    id: 3,
    title: 'Double bed 3',
    description: 'Description',
    location: 'North shore',
    closingTime: 'Fri 13th July, 4:19pm',
    price: '$1,100',
  },
]

function Watchlist() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>My Trade Me</h2>
          <ul className={styles.sidebarList}>
            <li>Account Details</li>
            <li>Notifications</li>
            <li className={styles.active}>Watchlist</li>
            <li>Favorites</li>
            <li>Fixed Price offer</li>
            <li>Start Listing</li>
            <li>Items I'm Listing</li>
            <li>Sold</li>
            <li>Unsold</li>
            <li>Sales Summary</li>
            <li>My Products</li>
          </ul>
        </aside>

        <section className={styles.watchlistSection}>
          <h1 className={styles.title}>Watchlist</h1>

          {dummyItems.map((item) => (
            <div key={item.id} className={styles.watchlistItem}>
              <div className={styles.itemImagePlaceholder}></div>
              <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                  <span>{item.location}</span>
                  <span>Closes: {item.closingTime}</span>
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className={styles.buyNow}>Buy Now {item.price}</div>
                <button className={styles.compareButton}>
                  Compare with similar Items
                </button>
              </div>
              <div className={styles.checkmark}>
                <span>&#1004;</span>
              </div>
            </div>
          ))}

          <Link to="/" className={styles.backButton}>
            ← Back
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Watchlist
