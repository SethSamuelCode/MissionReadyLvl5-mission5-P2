import React from "react";
import styles from "./ItemCard.module.css";

export default function ItemCard({ item }) {
  return (
    <div className={styles.itemCardContainer}>
      <img
        src={item.imagesLinks[0]}
        alt={item.title}
      />
      <div className={styles.bottom}>
        <div className={styles.locationAndClosing}>
          <p className={styles.location}>{item.pickupLocation}</p>
          <p className={styles.closingTime}>
            Closes {new Date(item.closingDate).toLocaleString("en-NZ", { weekday: "short", day: "2-digit", month: "short" })}
          </p>
        </div>
        <p>{item.title}</p>

        <p className={styles.buyNowTitle}>Buy Now</p>
        <p>${item.currentBidPrice}</p>

      </div>
    </div>
  );
}
