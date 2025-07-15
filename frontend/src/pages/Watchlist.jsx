import React, { useEffect, useState } from 'react'
import styles from './Watchlist.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'

const Watchlist = () => {
  const [allItems, setAllItems] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [showAllItems, setShowAllItems] = useState(false)

  const userId = 'demoUser'

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/items')
        setAllItems(res.data.data)
      } catch (err) {
        console.error('Error fetching items:', err)
      }
    }
    fetchItems()
  }, [])
  // useEffect(() => {
  //   const savedWatchlist = localStorage.getItem('watchlist')
  //   if (savedWatchlist) {
  //     setWatchlist(JSON.parse(savedWatchlist))
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('watchlist', JSON.stringify(watchlist))
  // }, [watchlist])

  //Fetch watchlist from backend based on userId
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/watchlist?userId=${userId}`
        )
        setWatchlist(res.data)
      } catch (err) {
        console.error('Error fetching watchlist:', err)
      }
    }
    fetchWatchlist()
  }, [])

  // const handleAddToWatchlist = (item) => {
  //   if (!watchlist.find((w) => w.title === item.title)) {
  //     setWatchlist([...watchlist, item])
  //   }
  // }
  const handleAddToWatchlist = async (item) => {
    try {
      const res = await axios.post('http://localhost:4000/api/watchlist', {
        userId: 'demoUser',
        itemId: item._id,
      })

      // Only updates the UI if backend confirms success
      if (res.status === 201) {
        setWatchlist((prev) => [
          ...prev,
          {
            _id: res.data.id,
            userId,
            itemId: item._id,
            addedAt: new Date(),
            itemDetails: item,
          },
        ])
      }
    } catch (err) {
      if (err.response?.status === 409) {
        console.warn('Item already in watchlist')
      } else {
        console.error('Error adding item to watchlist:', err)
      }
    }
  }
  // const handleRemove = (title) => {
  //   setWatchlist(watchlist.filter((i) => i.title !== title))
  // }

  const handleRemove = async (item) => {
    try {
      const res = await axios.delete('http://localhost:4000/api/watchlist', {
        data: {
          userId: 'demoUser',
          itemId: item.itemId,
        },
      })

      if (res.status === 200) {
        setWatchlist((prev) => prev.filter((i) => i._id !== item._id))
      }
    } catch (err) {
      console.error('Error removing item from watchlist:', err)
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.pageContainer}>
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
              <div className={styles.headerRow}>
                <h1 className={styles.title}>All Auction Items</h1>
                <button
                  className={styles.hideButton}
                  onClick={() => setShowAllItems(!showAllItems)}
                >
                  {showAllItems ? 'Hide' : 'Show'}
                </button>
              </div>

              {showAllItems &&
                allItems.map((item, index) => (
                  <div key={index} className={styles.watchlistItem}>
                    <img
                      src={item.images_links?.[0]}
                      alt={item.Title}
                      className={styles.itemImagePlaceholder}
                    />
                    <div className={styles.itemInfo}>
                      <div className={styles.itemHeader}>
                        <span>
                          {item.pickup_location || 'Unknown Location'}
                        </span>
                        <span>Closes: {item.closing_date || 'TBD'}</span>
                      </div>
                      <h2>{item.Title}</h2>
                      <p>{item.Description}</p>
                      <div className={styles.buyNow}>
                        Buy Now: ${item.buy_now_price}
                      </div>
                      <button
                        className={styles.compareButton}
                        onClick={() => handleAddToWatchlist(item)}
                      >
                        Add to Watchlist
                      </button>
                    </div>
                  </div>
                ))}

              <h1 className={styles.title}>My Watchlist</h1>
              {watchlist.length === 0 ? (
                <p className={styles.emptyMessage}>No items added yet.</p>
              ) : (
                watchlist.map((item, index) => (
                  <div key={index} className={styles.watchlistItem}>
                    <img
                      src={item.imageslinks?.[0]}
                      alt={item.title}
                      className={styles.itemImagePlaceholder}
                    />
                    <div className={styles.itemInfo}>
                      <div className={styles.itemHeader}>
                        <span>{item.pickuplocation || 'Unknown Location'}</span>
                        <span>Closes: {item.closingdate || 'TBD'}</span>
                      </div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <div className={styles.buyNow}>
                        Buy Now: ${item.buynowprice}
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Watchlist
