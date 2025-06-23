import styles from "./ProductPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { itemID } = useParams();
  const [item, setItem] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [title, setTitle] = useState();
  const [currentBid, setCurrentBid] = useState();
  const [auctionClosingTime, setActionClosingTime] = useState(new Date("January 01, 2000"));
  const [timeLeftInAuction, setTimeLeftInAuction] = useState();

  const BACKEND_URL = "http://localhost:4000/api";

  useEffect(() => {
    async function setItemFromDB() {
      const resp = await fetch(`${BACKEND_URL}/item/${itemID}`);
      const tempFromDB = await resp.json();
      setImageUrl(tempFromDB.images_links[0]);
      setTitle(tempFromDB.title);
      setItem(tempFromDB);
      setCurrentBid(tempFromDB.Current_Bid_price);
      setActionClosingTime(new Date(tempFromDB.closing_date));
      // console.log(new Date(tempFromDB.closing_date))
      // console.log(auctionClosingTime)
      // console.log(tempFromDB)
    }

    setItemFromDB();
  }, []);

  setTimeout(() => {
   const msLeft =  auctionClosingTime - new Date();
    const hoursLeft = msLeft / (1000 * 60 * 60)
    setTimeLeftInAuction(hoursLeft)
  }, 1000);

  return (
    <div className={styles.container}>
      <div className={styles.locationBar}></div>
      <div className={styles.images}>
        <img
          src={imageUrl}
          alt="Random product"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
          }}
        />
        {/* <p>{JSON.stringify(item)}</p> */}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.title}>{title}</div>
        <div className={styles.watchListAndCompareButton}>
          <button>❤️ Add to Watchlist</button>
          <button>🔄 Compare</button>
        </div>
        <div className={styles.bidBox}>
          <h3>Current Bid: ${currentBid}</h3>
          <p>Time Left: {timeLeftInAuction}</p>
          <input
            type="number"
            placeholder="Enter bid amount"
          />
          <button
            style={{
              marginTop: "10px",
              display: "block",
            }}>
            Place Bid
          </button>
        </div>
        <div className={styles.bidHistory}>
          <h4>Recent Bids</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}>
            <li>User123 - $1,299.99</li>
            <li>Collector55 - $1,250.00</li>
            <li>VintageLP - $1,200.00</li>
          </ul>
        </div>
      </div>
      <div className={styles.shippingAndPaymentOptions}>
        <div className={styles.shippingAndPickup}>
          <h4>Shipping Options</h4>
          <p>📦 Standard Shipping: $15.99</p>
          <p>🚚 Express Delivery: $25.99</p>
          <p>🏪 Local Pickup Available</p>
        </div>
        <div className={styles.paymentOptions}>
          <h4>Payment Methods</h4>
          <p>💳 Credit Card</p>
          <p>🏦 Bank Transfer</p>
          <p>📱 Digital Wallet</p>
        </div>
      </div>
      <div className={styles.productDetailsAndDescription}>
        <h3>Product Details</h3>
        <p>This vintage camera is a remarkable piece from our 2025 collection. Features include:</p>
        <ul>
          <li>Professional-grade lens system</li>
          <li>Original leather case included</li>
          <li>Fully restored mechanism</li>
          <li>Limited edition number: 47/100</li>
        </ul>
      </div>
      <div className={styles.sellerContainer}>
        <div className={styles.sellerInfo}>
          <h3>VintageCollector Pro</h3>
          <p>⭐⭐⭐⭐⭐ (485 reviews)</p>
          <p>Member since 2020</p>
          <p>📍 Located in New York, USA</p>
        </div>
        <div className={styles.sellerLogo}>
          <img
            src="https://picsum.photos/120/120"
            alt="Seller logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
      <div className={styles.questionsAndAnswers}>
        <h3>Questions & Answers</h3>
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Q: Is the original box included?</strong>
          </p>
          <p>A: Yes, the camera comes with its original packaging and documentation.</p>
          <hr />
          <p>
            <strong>Q: What's the shutter count?</strong>
          </p>
          <p>A: The camera has been used for approximately 1,000 shots since restoration.</p>
        </div>
      </div>
      <div className={styles.similarItems}>
        <h3>Similar Items You May Like</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
          }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{ flex: 1 }}>
              <img
                src={`https://picsum.photos/200/200?random=${i}`}
                alt={`Similar item ${i}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p>Vintage Camera Model {i}</p>
              <p>$999.99</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
