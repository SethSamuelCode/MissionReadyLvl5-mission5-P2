// ----------------------- IMPORTS ---------------------- //

import styles from "./ProductPage.module.css";
import { useParams, useNavigate, Link } from "react-router";
import { use, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import watchListIcon from "../assets/images/watchlistIcon.svg";
import compareIcon from "../assets/images/compareIcon.svg";
import ItemCard from "../components/ItemCard";

// ------------------ HELPER COMPONENTS ------------------ //

/**
 * Renders the product description section
 * @param {string} description - The product description text
 */
function ProductDescription({ description }) {
  return (
    <>
      <p className={styles.productDescription}>{description}</p>
    </>
  );
}

/**
 * Generates a random color for seller avatars based on username and join date
 * Uses XOR operation to create a consistent but random-looking color
 * @param {string} username - The seller's username
 * @param {any} joinDate - The date the seller joined
 * @returns {string} A hex color code
 */
function randomColorForLogo(username, joinDate) {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
    "#8E44AD",
    "#E67E22",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#F39C12",
  ];
  const combinedData = JSON.stringify({ username, joinDate });
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(combinedData);
  const index =
    byteArray.reduce((acc, byte) => {
      return acc ^ byte; // XOR operation to combine bytes
    }, 0) % colors.length;
  return colors[index];
}

/**
 * Renders the product details section with all specifications
 * @param {Object} props - Product specifications
 */
function ProductDetails({ condition, dimensions, weight, color, material, manufacturer }) {
  return (
    <>
      <div className={styles.detailsContainer}>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Condition:</p>
          <p className={styles.detailValue}>{condition}</p>
        </div>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Dimensions:</p>
          <p className={styles.detailValue}>{dimensions}</p>
        </div>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Weight:</p>
          <p className={styles.detailValue}>{weight}</p>
        </div>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Color:</p>
          <p className={styles.detailValue}>{color}</p>
        </div>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Material:</p>
          <p className={styles.detailValue}>{material}</p>
        </div>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Manufacturer:</p>
          <p className={styles.detailValue}>{manufacturer}</p>
        </div>
      </div>
    </>
  );
}

// ---------------------- FUNCTIONS --------------------- //

/**
 * Handles switching between product details and description tabs
 * Updates the UI state and styling accordingly
 */
function changeShowDetailsOrDescription(
  setShowDetailsOrDescription,
  detailsOrDescription,
  setProductTabClass,
  setDescriptionTabClass
) {
  setShowDetailsOrDescription(detailsOrDescription);

  if (detailsOrDescription === "details") {
    setProductTabClass(styles.activeTab);
    setDescriptionTabClass("");
  } else if (detailsOrDescription === "description") {
    setProductTabClass("");
    setDescriptionTabClass(styles.activeTab);
  }
}

/**
 * Handles navigation when a similar item is clicked
 * @param {string} itemID - The ID of the clicked item
 * @param {Function} setItemID - State setter for current item ID
 * @param {Function} navigate - React Router navigate function
 */
function handleClickSimilarItem(itemID, setItemID, navigate) {
  // Navigate to the product page of the clicked similar item
  navigate(`/item/${itemID}`);
  setItemID(itemID);
}

// ---------------------- MAIN COMPONENT --------------------- //

/**
 * ProductPage Component
 * Displays detailed information about a product including:
 * - Product images and carousel
 * - Auction details (current bid, time left)
 * - Product specifications
 * - Seller information
 * - Q&A section
 * - Similar items
 */
export default function ProductPage() {
  // --- Constants and Enums ---
  const detailsOrDescription = {
    DETAILS: "details",
    DESCRIPTION: "description",
  };
  // Freeze the object to prevent accidental modification
  Object.freeze(detailsOrDescription);

  // ----------------------- DEFINES ---------------------- //

  const { ParamItemID } = useParams();
  const [itemID, setItemID] = useState(ParamItemID);
  // State for product details
  const [imageUrl, setImageUrl] = useState();
  const [itemImages, setItemImages] = useState([]);
  const [title, setTitle] = useState();
  const [currentBid, setCurrentBid] = useState();
  const [auctionClosingTime, setActionClosingTime] = useState(new Date("January 01, 2000"));
  const [timeLeftInAuction, setTimeLeftInAuction] = useState();
  const [bidHistory, setBidHistory] = useState([]);

  // State for product specifications
  const [shippingOptions, setShippingOptions] = useState();
  const [paymentOptions, setPaymentOptions] = useState();
  const [showDetailsOrDescription, setShowDetailsOrDescription] = useState(detailsOrDescription.DETAILS);
  const [itemDescription, setItemDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  // State for seller information
  const [sellerUsername, setSellerUsername] = useState("");
  const [sellerRating, setSellerRating] = useState("");
  const [sellerLocation, setSellerLocation] = useState("");
  const [sellerMemberSince, setSellerMemberSince] = useState("");

  // UI state
  const [loaded, setLoaded] = useState(false);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [itemCategory, setItemCategory] = useState("");
  const [similarItems, setSimilarItems] = useState([]);
  const [buyNowPrice, setBuyNowPrice] = useState(0);
  const [productTabClass, setProductTabClass] = useState(styles.activeTab);
  const [descriptionTabClass, setDescriptionTabClass] = useState("");

  const BACKEND_URL = "http://localhost:4000/api";
  const navigate = useNavigate();

  // --------------------- USE EFFECTS --------------------- //

  // Fetch item details when itemID changes
  useEffect(() => {
    async function setItemFromDB() {
      const resp = await fetch(`${BACKEND_URL}/item/${itemID}`);
      const tempFromDB = await resp.json();
      if (!tempFromDB) {
        navigate("/404"); // Navigate to 404 page if item not found
      }
      setImageUrl(tempFromDB.imagesLinks[0]);
      setItemImages(tempFromDB.imagesLinks);
      setTitle(tempFromDB.title);
      setCurrentBid(tempFromDB.currentBidPrice);
      setActionClosingTime(new Date(tempFromDB.closingDate));
      setBidHistory(tempFromDB.bidHistory);
      setShippingOptions(tempFromDB.shippingType);
      setPaymentOptions(tempFromDB.paymentOptions);
      setItemDescription(tempFromDB.description);
      setCondition(tempFromDB.condition);
      setDimensions(tempFromDB.dimensions);
      setWeight(tempFromDB.weight);
      setColor(tempFromDB.color);
      setMaterial(tempFromDB.material);
      setManufacturer(tempFromDB.manufacturer);
      setSellerUsername(tempFromDB.owner);
      setQuestionsAndAnswers(tempFromDB.questionsAndAnswers || []); // Set questions and answers if available
      setItemCategory(tempFromDB.category); // Set item category if available
      setBuyNowPrice(tempFromDB.buyNowPrice || 0); // Set buy now price if available

      // console.log(new Date(tempFromDB.closing_date))
      // console.log(auctionClosingTime)
      // console.log(tempFromDB)
      setLoaded(true);
    }
    setItemFromDB();
  }, [itemID]);

  // Fetch seller information from the database using the sellerUsername
  // This effect runs whenever sellerUsername changes
  useEffect(() => {
    async function setSellerInfoFromDB() {
      if (!sellerUsername) {
        return; // If sellerUsername is not set, skip fetching
      }
      const resp = await fetch(`${BACKEND_URL}/user/${sellerUsername}`);
      try {
        const tempFromDB = await resp.json();
        setSellerRating(tempFromDB.starRating);
        setSellerLocation(tempFromDB.location);
        setSellerMemberSince(tempFromDB.memberSince);
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }
    }

    setSellerInfoFromDB();
  }, [sellerUsername]);

  // Update auction time remaining every second
  useEffect(() => {
    const timer = setInterval(() => {
      const msLeft = auctionClosingTime - new Date();
      if (msLeft <= 0) {
        setTimeLeftInAuction("Auction ended");
        clearInterval(timer);
        return;
      }

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(msLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((msLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);

      // Format with leading zeros
      const formattedDays = String(days).padStart(2, "0");
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      setTimeLeftInAuction(`${formattedDays}d ${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [auctionClosingTime]);

  // Fetch similar items when category changes
  useEffect(() => {
    // Fetch similar items based on the category of the current item

    if (itemCategory.length === 0) {
      return;
    }
    async function setSimilarItemsVar() {
      try {
        const response = await fetch(`${BACKEND_URL}/randomByField/category/${itemCategory}/10`);
        const data = await response.json();
        setSimilarItems(data);
      } catch (error) {}

      try {
        const response = await fetch(`${BACKEND_URL}/random/10`);
        const data = await response.json();
        setSimilarItems(data);
      } catch (error) {
        console.error("Error fetching similar items:", error);
      }
    }
    setSimilarItemsVar();
  }, [itemCategory]);

  // ------------ PAGE RENDER LOGIC STARTS HERE ----------- //

  // Show loading state while data is being fetched
  if (!loaded) {
    return (
      <div>
        <Header />
        <div className={styles.loading}>Loading...</div>;
        <Footer />
      </div>
    );
  }

  // ---------------------- MAIN PAGE --------------------- //

  return (
    <div className={styles.container}>
      <Header />
      {/* -------------------- LOCATION BAR -------------------- */}
      <div className={styles.locationBar}>
        <Link
          to="/"
          className={styles.homeLink}>
          Home
        </Link>
        <span> / </span>
        <Link to={`/${itemCategory}`}>{itemCategory}</Link>
      </div>

      {/* -------------------- SECTION ONE -------------------- */}

      <div className={styles.section1}>
        {/* --------------------- MAIN IMAGE --------------------- */}
        <div className={styles.images}>
          <img
            src={imageUrl}
            alt="Random product"
          />
          {/* ---------------------- CAROUSEL ---------------------- */}
          <div className={styles.carouselContainer}>
            {itemImages.map((image, index) => (
              <div
                key={index}
                className={styles.carouselItem}>
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  onClick={() => setImageUrl(image)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* ---------------------- SIDEBAR ---------------------- */}
        <div className={styles.sidebar}>
          <div className={styles.title}>{title}</div>
          <div className={styles.closingInfo}>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none">
                <path
                  d="M14.375 3.75C17.5244 3.75 20.5449 5.00111 22.7719 7.22811C24.9989 9.4551 26.25 12.4756 26.25 15.625C26.25 18.7744 24.9989 21.7949 22.7719 24.0219C20.5449 26.2489 17.5244 27.5 14.375 27.5C11.2256 27.5 8.2051 26.2489 5.97811 24.0219C3.75111 21.7949 2.5 18.7744 2.5 15.625C2.5 12.4756 3.75111 9.4551 5.97811 7.22811C8.2051 5.00111 11.2256 3.75 14.375 3.75ZM14.375 5C11.5571 5 8.85456 6.11942 6.86199 8.11199C4.86942 10.1046 3.75 12.8071 3.75 15.625C3.75 18.4429 4.86942 21.1454 6.86199 23.138C8.85456 25.1306 11.5571 26.25 14.375 26.25C15.7703 26.25 17.1519 25.9752 18.441 25.4412C19.7301 24.9073 20.9014 24.1246 21.888 23.138C22.8746 22.1514 23.6573 20.9801 24.1912 19.691C24.7252 18.4019 25 17.0203 25 15.625C25 12.8071 23.8806 10.1046 21.888 8.11199C19.8954 6.11942 17.1929 5 14.375 5ZM13.75 8.75H15V15.525L20.875 18.9125L20.25 20L13.75 16.25V8.75Z"
                  fill="#2F2C28"
                />
              </svg>
              Closes:{" "}
              {new Date(auctionClosingTime)
                .toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(" at", "")}
            </p>
            <p>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none">
                <path
                  d="M14.375 3.75C17.5244 3.75 20.5449 5.00111 22.7719 7.22811C24.9989 9.4551 26.25 12.4756 26.25 15.625C26.25 18.7744 24.9989 21.7949 22.7719 24.0219C20.5449 26.2489 17.5244 27.5 14.375 27.5C11.2256 27.5 8.2051 26.2489 5.97811 24.0219C3.75111 21.7949 2.5 18.7744 2.5 15.625C2.5 12.4756 3.75111 9.4551 5.97811 7.22811C8.2051 5.00111 11.2256 3.75 14.375 3.75ZM14.375 5C11.5571 5 8.85456 6.11942 6.86199 8.11199C4.86942 10.1046 3.75 12.8071 3.75 15.625C3.75 18.4429 4.86942 21.1454 6.86199 23.138C8.85456 25.1306 11.5571 26.25 14.375 26.25C15.7703 26.25 17.1519 25.9752 18.441 25.4412C19.7301 24.9073 20.9014 24.1246 21.888 23.138C22.8746 22.1514 23.6573 20.9801 24.1912 19.691C24.7252 18.4019 25 17.0203 25 15.625C25 12.8071 23.8806 10.1046 21.888 8.11199C19.8954 6.11942 17.1929 5 14.375 5ZM13.75 8.75H15V15.525L20.875 18.9125L20.25 20L13.75 16.25V8.75Z"
                  fill="#2F2C28"
                />
              </svg>
              Time Left: {timeLeftInAuction}
            </p>
          </div>
          {/* -------------------- WATCHLIST AND COMPARE BUTTONS -------------------- */}
          <div className={styles.watchListAndCompareButtons}>
            <button>
              <img
                src={watchListIcon}
                alt="Watchlist Icon"
              />{" "}
              Add to Watchlist
            </button>
            <button>
              <img
                src={compareIcon}
                alt="Compare Icon"
              />{" "}
              Compare
            </button>
          </div>
          {/* -------------------- BIDDING BUTTONS AND INFORMATION -------------------- */}
          <div className={styles.bidBox}>
            <p className={styles.bidLable}>Buy Now</p>
            <p className={styles.bidPrice}>${buyNowPrice}</p>
            <button>Buy Now</button>
            <p className={styles.bidLable}>Current Bid:</p>
            <p className={styles.bidPrice}>${currentBid}</p>
            <button>Place Bid</button>
          </div>
          {/* -------------------- BIDDING HISTORY -------------------- */}
          <div className={styles.bidHistory}>
            <ul>
              {/* {console.log(bidHistory)} */}
              {bidHistory
                .sort((a, b) => b.Bid - a.Bid)
                .map((bid, index) => {
                  if (index >= 3) {
                    return null;
                  } // Limit to the top 3 bids
                  const prefix = () => {
                    if (index === 0) return "1st";
                    if (index === 1) return "2nd";
                    if (index === 2) return "3rd";
                  };
                  return (
                    <li key={bid.userName + bid.Bid}>
                      <p className={styles.bidHistoryLine}>
                        <span className={styles.bidPrefix}>{prefix()} </span>
                        <span
                          className={styles.biderLogo}
                          style={{ backgroundColor: randomColorForLogo(bid.userName, bid.date) }}>
                          {bid.userName[0]}
                        </span>
                        <span>{bid.userName}:</span>
                        <span>${bid.Bid}</span>
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
                <button className={styles.reportButton}>Report</button>
        </div>
      </div>
      {/* -------------------- SECTION TWO -------------------- */}
      <div className={styles.section2}>
        {/* ---------------------- PRODUCT DETAILS AND DESCRIPTION ---------- */}
        <div className={styles.productDetailsAndDescription}>
          <div className={styles.detailAndDescriptionTabs}>
            <div
              className={styles.clickTab}
              onClick={() =>
                changeShowDetailsOrDescription(
                  setShowDetailsOrDescription,
                  detailsOrDescription.DETAILS,
                  setProductTabClass,
                  setDescriptionTabClass
                )
              }>
              <p className={productTabClass}>Product Details</p>
            </div>
            <div className={styles.middleTab}></div>
            <div
              className={styles.clickTab}
              onClick={() =>
                changeShowDetailsOrDescription(
                  setShowDetailsOrDescription,
                  detailsOrDescription.DESCRIPTION,
                  setProductTabClass,
                  setDescriptionTabClass
                )
              }>
              <p className={descriptionTabClass}>Product Description</p>
            </div>
          </div>
          <div className={styles.productDetailsContainer}>
            {showDetailsOrDescription === detailsOrDescription.DETAILS ? (
              <ProductDetails
                condition={condition}
                dimensions={dimensions}
                weight={weight}
                color={color}
                material={material}
                manufacturer={manufacturer}
              />
            ) : null}
            {showDetailsOrDescription === detailsOrDescription.DESCRIPTION ? (
              <ProductDescription description={itemDescription} />
            ) : null}
          </div>
        </div>
        {/* ---------------------- SHIPPING AND PAYMENT SIDEBAR ---------------------- */}
        <div className={styles.sidebar2}>
          <div className={styles.shippingAndPaymentOptions}>
            <div className={styles.shippingAndPickup}>
              <h4>Shipping Options</h4>
              <p>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path
                    d="M0 4.5V6H14.25V17.25H9.633C9.2985 15.9607 8.139 15 6.75 15C5.361 15 4.2015 15.9607 3.867 17.25H3V13.5H1.5V18.75H3.867C4.2015 20.0393 5.361 21 6.75 21C8.139 21 9.2985 20.0393 9.633 18.75H15.867C16.2015 20.0393 17.361 21 18.75 21C20.139 21 21.2985 20.0393 21.633 18.75H24V12.633L23.9528 12.5153L22.4528 8.01525L22.29 7.5H15.75V4.5H0ZM0.75 7.5V9H7.5V7.5H0.75ZM15.75 9H21.2108L22.5 12.8438V17.25H21.633C21.2985 15.9607 20.139 15 18.75 15C17.361 15 16.2015 15.9607 15.867 17.25H15.75V9ZM1.5 10.5V12H6V10.5H1.5ZM6.75 16.5C7.58775 16.5 8.25 17.1622 8.25 18C8.25 18.8378 7.58775 19.5 6.75 19.5C5.91225 19.5 5.25 18.8378 5.25 18C5.25 17.1622 5.91225 16.5 6.75 16.5ZM18.75 16.5C19.5877 16.5 20.25 17.1622 20.25 18C20.25 18.8378 19.5877 19.5 18.75 19.5C17.9123 19.5 17.25 18.8378 17.25 18C17.25 17.1622 17.9123 16.5 18.75 16.5Z"
                    fill="#2F2C28"
                  />
                </svg>{" "}
                {shippingOptions}
              </p>
            </div>
            <div className={styles.paymentOptions}>
              <h4>Payment Methods</h4>
              <p>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path
                    d="M19.125 4.5H4.875C3.42525 4.5 2.25 5.67525 2.25 7.125V16.875C2.25 18.3247 3.42525 19.5 4.875 19.5H19.125C20.5747 19.5 21.75 18.3247 21.75 16.875V7.125C21.75 5.67525 20.5747 4.5 19.125 4.5Z"
                    stroke="#2F2C28"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.25 9H21.75M6 14.0625H8.25V15H6V14.0625Z"
                    stroke="#2F2C28"
                    stroke-width="1.875"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
                {paymentOptions}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sellerContainer}>
        {/* ------------------ ABOUT THE SELLER ------------------ */}

        <p>About the seller</p>
        <div className={styles.innerSellerContainer}>
          <div className={styles.sellerInfo}>
            <p>
              <span> Location:</span> <span></span> <span>{sellerLocation}</span>
            </p>
            <p>
              <span> Member since:</span> <span></span> <span>{sellerMemberSince}</span>
            </p>

            <Link>
              <span>View sellers Other listings</span>
              <span></span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="22"
                  viewBox="0 0 12 22"
                  fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.5229 12.1665L2.30425 21.5L0 19.167L8.0665 11L0 2.83297L2.30425 0.5L11.5229 9.83352C11.8284 10.1429 12 10.5625 12 11C12 11.4375 11.8284 11.8571 11.5229 12.1665Z"
                    fill="#4854D3"
                  />
                </svg>
              </span>
            </Link>
            <button className={styles.addToFavoriteButton}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
                  fill="white"
                />
              </svg>{" "}
              Add to Favorite Seller
            </button>
          </div>
          {/* ------------------ SELLER LOGO ------------------ */}
          <div className={styles.sellerLogo}>
            <div
              className={styles.sellerCircle}
              style={{ backgroundColor: randomColorForLogo(sellerUsername, sellerMemberSince) }}>
              <p className={styles.sellerInitial}>{sellerUsername.toString()[0]}</p>
            </div>
            <p className={styles.sellerName}>{sellerUsername}</p>
            <p className={styles.sellerRating}>seller rating: {sellerRating}</p>
          </div>
        </div>
      </div>
      {/* ------------------ QUESTIONS AND ANSWERS ------------------ */}
      <div className={styles.questionsAndAnswers}>
        <h3 className={styles.questionsTitle}>Questions & Answers</h3>
        <div className={styles.questionsList}>
          {questionsAndAnswers.length !== 0 ? (
            questionsAndAnswers.map((qa, index) => (
              <div key={index}>
                <p className={styles.question}>
                  {qa.question} <span>:Q</span>
                </p>
                <p className={styles.answer}>
                  {" "}
                  <span>A: </span> {qa.answer}
                </p>
              </div>
            ))
          ) : (
            <p>No questions have been asked yet.</p>
          )}
        </div>
        <div className={styles.questionBar}>
          <input
            type="text"
            placeholder="Type your question here..."
            className={styles.questionInput}
          />
          <button className={styles.askButton}>Ask Question</button>
        </div>
      </div>
      {/* ------------------ SIMILAR ITEMS ------------------ */}
      <div className={styles.similarItems}>
        <p className={styles.similarTitle}>Similar Items You May Like</p>
        <div className={styles.similarItemsList}>
          {similarItems.map((item) => (
            <div
              key={item._id}
              className={styles.similarItem}
              onClick={() => handleClickSimilarItem(item._id.toString(), setItemID, navigate)}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
