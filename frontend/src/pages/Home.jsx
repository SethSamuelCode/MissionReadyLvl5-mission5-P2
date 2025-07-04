import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CatergoryFilter from "../components/CatergoryFilter";
import { Link } from "react-router-dom";

const Home = () => {
  const carouselRef = useRef(null);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/results");
        const json = await res.json();
        if (json.status === "success") {
          setAuctions(json.data);
          console.log("Auction categories:", json.data.map(a => a.category));
        }
      } catch (err) {
        console.error("Error loading auctions:", err);
      }
    };

    fetchAuctions();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.page}>
          <div className={styles.searchFilterContainer}>
            <SearchBar />
            <div className={styles.catergoryFilter}>
              <CatergoryFilter />
            </div>

            <div className={styles.catergoryListContainer}>
              <ul>
                <li>Bathroom <span>(401)</span></li>
                <li>Cleaning Bin <span>(801)</span></li>
                <li>Curtains <span>(531)</span></li>
                <li>Bedframe <span>(211)</span></li>
                <li>Lamp <span>(324)</span></li>
              </ul>
              <ul>
                <li>Laundry <span>(978)</span></li>
                <li>Storage <span>(643)</span></li>
                <li>Travel <span>(532)</span></li>
                <li>Table <span>(578)</span></li>
                <li>Kitchen <span>(487)</span></li>
              </ul>
              <ul>
                <li>Heating & Cooling <span>(331)</span></li>
                <li>Home Decor <span>(561)</span></li>
                <li>Art Posters <span>(751)</span></li>
                <li>Cleaning <span>(976)</span></li>
                <li>Mats & Rugs <span>(235)</span></li>
              </ul>
              <ul>
                <li>Outdoor <span>(121)</span></li>
                <li>Clock <span>(234)</span></li>
                <li>Utensils <span>(433)</span></li>
                <li>Office <span>(856)</span></li>
                <li>Blanket <span>(348)</span></li>
              </ul>
            </div>

            <section className={styles.coolAuctionsSection}>
              <h2>
                Recommended in{" "}
                <span className={styles.highlight}>
                  Expensive Items
                </span>
              </h2>

              <div className={styles.carouselWrapper}>
                <button className={styles.carouselButton} onClick={scrollLeft}>
                  &#10094;
                </button>

                <div className={styles.auctionCards} ref={carouselRef}>
                  {auctions
                    .slice(0, 10) // TEMP: to ensure items render
                    .map((item) => (
                      <Link
                        to={`/item/${item._id}`}
                        key={item._id}
                        className={styles.card}
                      >
                        <img
                          src={
                            item.imageslinks?.[0] ||
                            "https://www.dealking.co.nz/cdn/shop/files/Bella3SeaterBeige_720x.jpg?v=1694566264"
                          }
                          alt={item.title}
                        />
                        <div className={styles.cardDetails}>
                          <span>{item.pickuplocation || "Unknown"}</span>
                          <span>
                            Closes{" "}
                            {new Date(item.closingdate).toLocaleDateString(
                              "en-NZ",
                              {
                                weekday: "short",
                                day: "numeric",
                                month: "long",
                              }
                            )}
                          </span>
                          <h4>{item.title}</h4>
                          <div className={styles.priceRow}>
                            {item.reserveprice === 0 && <span>No reserve</span>}
                            <span className={styles.buyNow}>
                              Buy Now <br />${item.buynowprice || "N/A"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>

                <button className={styles.carouselButton} onClick={scrollRight}>
                  &#10095;
                </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
