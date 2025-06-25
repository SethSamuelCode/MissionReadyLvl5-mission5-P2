import styles from './ProductPage.module.css'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

function ProductDescription({ description }) {
  return (
    <>
      <h3>Product Details</h3>
      <p>{description}</p>
    </>
  )
}

function changeShowDetailsOrDescription(
  setShowDetailsOrDescription,
  detailsOrDescription
) {
  setShowDetailsOrDescription(detailsOrDescription)
}

function ProductDetails({
  condition,
  dimensions,
  weight,
  color,
  material,
  manufacturer,
}) {
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
  )
}

export default function ProductPage() {
  const detailsOrDescription = {
    DETAILS: 'details',
    DESCRIPTION: 'description',
  }

  Object.freeze(detailsOrDescription)

  const { itemID } = useParams()
  const [item, setItem] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [title, setTitle] = useState()
  const [currentBid, setCurrentBid] = useState()
  const [auctionClosingTime, setActionClosingTime] = useState(
    new Date('January 01, 2000')
  )
  const [timeLeftInAuction, setTimeLeftInAuction] = useState()
  const [bidHistory, setBidHistory] = useState([])
  const [shippingOptions, setShippingOptions] = useState()
  const [paymentOptions, setPaymentOptions] = useState()
  const [showDetailsOrDescription, setShowDetailsOrDescription] = useState(
    detailsOrDescription.DETAILS
  )
  const [itemDescription, setItemDescription] = useState('')
  const [condition, setCondition] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [weight, setWeight] = useState('')
  const [color, setColor] = useState('')
  const [material, setMaterial] = useState('')
  const [manufacturer, setManufacturer] = useState('')

  const BACKEND_URL = 'http://localhost:4000/api'

  useEffect(() => {
    async function setItemFromDB() {
      const resp = await fetch(`${BACKEND_URL}/item/${itemID}`)
      const tempFromDB = await resp.json()
      setImageUrl(tempFromDB.images_links[0])
      setTitle(tempFromDB.title)
      setItem(tempFromDB)
      setCurrentBid(tempFromDB.Current_Bid_price)
      setActionClosingTime(new Date(tempFromDB.closing_date))
      setBidHistory(tempFromDB.Bid_history)
      setShippingOptions(tempFromDB.Shipping_type)
      setPaymentOptions(tempFromDB.payment_options)
      setItemDescription(tempFromDB.Description)
      setCondition(tempFromDB.Condition)
      setDimensions(tempFromDB.Dimensions)
      setWeight(tempFromDB.weight)
      setColor(tempFromDB.Color)
      setMaterial(tempFromDB.Material)
      setManufacturer(tempFromDB.Manufacturer)
      // console.log(new Date(tempFromDB.closing_date))
      // console.log(auctionClosingTime)
      // console.log(tempFromDB)
    }

    setItemFromDB()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const msLeft = auctionClosingTime - new Date()
      if (msLeft <= 0) {
        setTimeLeftInAuction('Auction ended')
        clearInterval(timer)
        return
      }

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(msLeft / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (msLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((msLeft % (1000 * 60)) / 1000)

      // Format with leading zeros
      const formattedDays = String(days).padStart(2, '0')
      const formattedHours = String(hours).padStart(2, '0')
      const formattedMinutes = String(minutes).padStart(2, '0')
      const formattedSeconds = String(seconds).padStart(2, '0')

      setTimeLeftInAuction(
        `${formattedDays}d ${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      )
    }, 1000)

    // Cleanup timer on component unmount
    return () => clearInterval(timer)
  }, [auctionClosingTime])

  return (
    <div className={styles.container}>
      <div className={styles.locationBar}></div>
      <div className={styles.images}>
        <img
          src={imageUrl}
          alt="Random product"
          style={{
            width: '100%',
            height: '400px',
            // objectFit: "cover",
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
          <input type="number" placeholder="Enter bid amount" />
          <button
            style={{
              marginTop: '10px',
              display: 'block',
            }}
          >
            Place Bid
          </button>
        </div>
        <div className={styles.bidHistory}>
          <h4>Recent Bids</h4>
          <ul>
            {/* {console.log(bidHistory)} */}
            {bidHistory.map((bid) => {
              return (
                <li key={bid.userName + bid.Bid}>
                  {bid.userName}: ${bid.Bid}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className={styles.shippingAndPaymentOptions}>
        <div className={styles.shippingAndPickup}>
          <h4>Shipping Options</h4>
          <p>{shippingOptions}</p>
        </div>
        <div className={styles.paymentOptions}>
          <h4>Payment Methods</h4>
          <p>{paymentOptions}</p>
        </div>
      </div>
      <div className={styles.productDetailsAndDescription}>
        <div className={styles.detailAndDescriptionTabs}>
          <div
            onClick={() =>
              changeShowDetailsOrDescription(
                setShowDetailsOrDescription,
                detailsOrDescription.DETAILS
              )
            }
          >
            Product Details
          </div>
          <div
            onClick={() =>
              changeShowDetailsOrDescription(
                setShowDetailsOrDescription,
                detailsOrDescription.DESCRIPTION
              )
            }
          >
            Product Description
          </div>
        </div>

        {showDetailsOrDescription === detailsOrDescription.DETAILS ? (
          <ProductDescription description={itemDescription} />
        ) : null}
        {showDetailsOrDescription === detailsOrDescription.DESCRIPTION ? (
          <ProductDetails
            condition={condition}
            dimensions={dimensions}
            weight={weight}
            color={color}
            material={material}
            manufacturer={manufacturer}
          />
        ) : null}
      </div>
      <div className={styles.sellerContainer}>
        <div className={styles.sellerInfo}>
          <h3>{sellerUsername}</h3>
          <p>Rating: ⭐⭐⭐⭐⭐ ({sellerRating} )</p>
          <p>Member since {sellerMemberSince}</p>
          <p>Located in {sellerLocation}</p>
        </div>
        <div className={styles.sellerLogo}>
          <div
            className={styles.sellerCircle}
            style={{
              backgroundColor: randomColorForLogo(
                sellerUsername,
                sellerMemberSince
              ),
            }}
          >
            <p>{sellerUsername.toString()[0]}</p>
          </div>
          <p>{sellerUsername}</p>
          <p>sellerRating: {sellerRating}</p>
        </div>
      </div>
      <div className={styles.questionsAndAnswers}>
        <h3>Questions & Answers</h3>
        <div className={styles.questionsList}>
          {questionsAndAnswers.length !== 0 ? (
            questionsAndAnswers.map((qa, index) => (
              <div key={index}>
                <p>
                  <strong>Q: {qa.question}</strong>
                </p>
                <p>A: {qa.answer}</p>
              </div>
            ))
          ) : (
            <p>No questions have been asked yet.</p>
          )}
        </div>
      </div>
      <div className={styles.similarItems}>
        <h3>Similar Items You May Like</h3>
        <div className={styles.similarItemsList}>
          {similarItems.map((item) => (
            <div
              key={item._id}
              className={styles.similarItem}
              onClick={() =>
                handleClickSimilarItem(item._id.toString(), setItemID, navigate)
              }
            >
              <img src={item.images_links[0]} alt={item.Title} />
              <h4>{item.Title}</h4>
              <p>Price: ${item.Current_Bid_price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
