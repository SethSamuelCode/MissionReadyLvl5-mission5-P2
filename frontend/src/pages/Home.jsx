import styles from "./Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from '../components/SearchBar';
import CatergoryFilter from "../components/CatergoryFilter";
import { useRef } from "react";

const dummyAuctions = [
  {
    id: 1,
    image: "/images/outdoor1.jpg",
    title: "Outdoor Sofa (Nova)",
    price: 749,
    reserve: true,
    location: "Auckland",
    closing: "Wed, 25 July",
  },
  {
    id: 2,
    image: "/images/outdoor2.jpg",
    title: "Outdoor Day Bed (Wicker)",
    price: 800,
    reserve: false,
    location: "Auckland",
    closing: "Wed, 25 July",
  },
  {
    id: 3,
    image: "/images/outdoor3.jpg",
    title: "Outdoor Dining Suite",
    price: 1199,
    reserve: false,
    location: "Auckland",
    closing: "Sat, 28 July",
  },
  {
    id: 4,
    image: "/images/outdoor4.jpg",
    title: "Outdoor Sofa Set",
    price: 584,
    reserve: false,
    location: "Auckland",
    closing: "Fri, 27 June",
  },
];

const Home = () => {
  const carouselRef = useRef(null);

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
    <>
      <div className={styles.body}>
        <div className={styles.pageContainer}>
          <Header />
          <main className={styles.page}>
            <div className={styles.searchFilterContainer}>
              
              <SearchBar></SearchBar>


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
                    {dummyAuctions.map((item) => (
                      <div key={item.id} className={styles.card}>
                        <img src={item.image} alt={item.title} />
                        <div className={styles.cardDetails}>
                          <span>{item.location}</span>
                          <span>Closes {item.closing}</span>
                          <h4>{item.title}</h4>
                          <div className={styles.priceRow}>
                            {item.reserve && <span>No reserve</span>}
                            <span className={styles.buyNow}>
                              Buy Now <br />${item.price}
                            </span>
                          </div>
                        </div>
                      </div>
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
    </>
  );
};

export default Home;
