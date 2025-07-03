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
                <li>Bathroom</li>
                <li>Cleaning Bin</li>
                <li>Curtains</li>
                <li>Bedframe</li>
                <li>Lamp</li>
              </ul>
              <ul>
                <li>Laundry</li>
                <li>Storage</li>
                <li>Travel</li>
                <li>Table</li>
                <li>Kitchen</li>
              </ul>
              <ul>
                <li>Heating & Cooling</li>
                <li>Home Decor</li>
                <li>Art Posters</li>
                <li>Cleaning</li>
                <li>Mats & Rugs</li>
              </ul>
              <ul>
                <li>Outdoor</li>
                <li>Clock</li>
                <li>Utensils</li>
                <li>Office</li>
                <li>Blanket</li>
              </ul>
            </div>

            <section className={styles.coolAuctionsSection}>
              <h2>
                Recommended in{" "}
                <span className={styles.highlight}>
                  Outdoor, garden & conservatory
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
