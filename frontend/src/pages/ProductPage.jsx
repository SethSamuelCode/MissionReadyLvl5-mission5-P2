import styles from "./ProductPage.module.css";

export default function ProductPage() {
  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <img
          src="https://picsum.photos/400/400"
          alt="Random product"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
          }}
        />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.title}>
          Vintage Collection Camera - Limited Edition (2025)
        </div>
        <div className={styles.watchListAndCompareButton}>
          <button>❤️ Add to Watchlist</button>
          <button>🔄 Compare</button>
        </div>
        <div className={styles.bidBox}>
          <h3>Current Bid: $1,299.99</h3>
          <p>Time Left: 2d 15h 30m</p>
          <input type="number" placeholder="Enter bid amount" />
          <button
            style={{
              marginTop: "10px",
              display: "block",
            }}
          >
            Place Bid
          </button>
        </div>
        <div className={styles.bidHistory}>
          <h4>Recent Bids</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
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
        <p>
          This vintage camera is a remarkable piece from our 2025 collection.
          Features include:
        </p>
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
          <p>
            A: Yes, the camera comes with its original packaging and
            documentation.
          </p>
          <hr />
          <p>
            <strong>Q: What's the shutter count?</strong>
          </p>
          <p>
            A: The camera has been used for approximately 1,000 shots since
            restoration.
          </p>
        </div>
      </div>
      <div className={styles.similarItems}>
        <h3>Similar Items You May Like</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1 }}>
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
