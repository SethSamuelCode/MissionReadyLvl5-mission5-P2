import React from "react";
import styles from "./itemCard.module.css";

export default function ItemCard({ item }) {
  return (
    <div className={styles.itemCardContainer}>
      <img
        src={item.images_links[0]}
        alt={item.Title}
      />
      <div className={styles.bottom}>
        <div className={styles.locationAndClosing}>
          <p className={styles.location}>{item.pickup_location}</p>
          <p className={styles.closingTime}>
            Closes {new Date(item.closing_date).toLocaleString("en-NZ", { weekday: "short", day: "2-digit", month: "short" })}
          </p>
        </div>
        <p>{item.Title}</p>

          <p className={styles.buyNowTitle}>Buy Now</p>
          <p>${item.Current_Bid_price}</p>

      </div>
    </div>
  );
}
