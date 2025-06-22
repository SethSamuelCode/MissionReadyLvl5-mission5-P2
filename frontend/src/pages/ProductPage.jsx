import styles from "./ProductPage.module.css";

export default function ProductPage() {
  return (
    <div className={styles.container}>
      <div className={styles.images}></div>
      <div className={styles.sidebar}>
        <div className={styles.title}></div>
        <div className={styles.watchListAndCompareButton}></div>
        <div className={styles.bidBox}></div>
        <div className={styles.bidHistory}></div>
      </div>
      <div className={styles.shippingAndPaymentOptions}>
        <div className={styles.shippingAndPickup}></div>
        <div className={styles.paymentOptions}></div>
      </div>
      <div className={styles.productDetailsAndDescription}></div>
      <div className={styles.sellerContainer}>
        <div className={styles.sellerInfo}></div>
        <div className={styles.sellerLogo}></div>
      </div>
      <div className={styles.questionsAndAnswers}></div>
      <div className={styles.similarItems}></div>
    </div>
  );
}
