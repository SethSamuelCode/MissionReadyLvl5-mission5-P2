import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./Marketplace.module.css";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CatergoryFilter from "../components/CatergoryFilter";
import Footer from "../components/Footer";

const Marketplace = () => {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search");
    if (keyword) {
      handleSearch(keyword);
    }
  }, [location.search]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  const handleSearch = async (query) => {
    try {
      const res = await fetch("http://localhost:4000/api/results");
      const json = await res.json();

      if (json.status === "success") {
        let filtered = json.data;

        if (typeof query === "string") {
          query = { keyword: query, searchBy: "title" };
        }

        if (Object.keys(query).length > 0) {
          filtered = filtered.filter((item) => {
            const matchesCategory =
              !query.category ||
              item.category?.toLowerCase() === query.category?.toLowerCase();

            const matchesSearch =
              (!query.searchBy &&
                item.title?.toLowerCase().includes(query.keyword?.toLowerCase())) ||
              (query.searchBy === "title" &&
                item.title?.toLowerCase().includes(query.keyword?.toLowerCase())) ||
              (query.searchBy === "description" &&
                item.description?.toLowerCase().includes(query.keyword?.toLowerCase()));

            const matchesCondition =
              !query.condition ||
              item.condition?.toLowerCase() === query.condition?.toLowerCase();

            const matchesLocation =
              !query.location ||
              item.pickuplocation?.toLowerCase() === query.location?.toLowerCase();

            const matchesPayment =
              !query.payment ||
              item.paymentoptions?.toLowerCase().includes(query.payment?.toLowerCase());

            const matchesShipping =
              !query.shipping ||
              item.shippingtype?.toLowerCase().includes(query.shipping?.toLowerCase());

            const matchesClearance =
              !query.clearance ||
              item.clearance?.toString().toLowerCase() ===
                query.clearance?.toString().toLowerCase();

            const matchesMinPrice =
              query.minPrice === undefined ||
              parseFloat(item.reserveprice || 0) >= query.minPrice;

            const matchesMaxPrice =
              query.maxPrice === undefined ||
              parseFloat(item.reserveprice || 0) <= query.maxPrice;

            return (
              matchesCategory &&
              matchesSearch &&
              matchesCondition &&
              matchesLocation &&
              matchesPayment &&
              matchesShipping &&
              matchesClearance &&
              matchesMinPrice &&
              matchesMaxPrice
            );
          });
        }

        setResults(filtered);
        setHasSearched(true);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setHasSearched(true);
    }
  };

  const toggleWatchlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    const exists = saved.find((w) => w.title === item.title);
    let updated;

    if (exists) {
      updated = saved.filter((w) => w.title !== item.title);
    } else {
      // Ensures consistent structure expected by Watchlist page
      const cleanedItem = {
        title: item.title,
        description: item.description,
        pickuplocation: item.pickuplocation,
        closingdate: item.closingdate,
        buynowprice: item.buynowprice,
        imageslinks: item.imageslinks,
      };
      updated = [...saved, cleanedItem];
    }

    localStorage.setItem("watchlist", JSON.stringify(updated));
    setWatchlist(updated);
  };

  return (
    <div className={styles.body}>
      <div className={styles.pageContainer}>
        <Header />
        <main className={styles.page}>
          <div className={styles.searchFilterContainer}>
            <SearchBar onSearch={handleSearch} />
            <CatergoryFilter onFilterSearch={handleSearch} />
          </div>

          <div className={styles.resultsWrapper}>
            {hasSearched && (
              <div className={styles.resultsContainer}>
                <h1 className={styles.resultsTitle}>Results</h1>
                <div className={styles.resultsSeparator}>
                  {results.length > 0 ? (
                    results.map((item) => (
                      <Link
                        to={`/item/${item._id}`}
                        key={item._id}
                        className={styles.resultCard}
                      >
                        <div className={styles.imageWrapper}>
                          <img
                            src={
                              item.imageslinks?.[0] ||
                              "https://www.dealking.co.nz/cdn/shop/files/Bella3SeaterBeige_720x.jpg?v=1694566264"
                            }
                            alt={item.title}
                            className={styles.resultImage}
                          />

                          <div
                            className={`${styles.starCorner} ${
                              watchlist.find((w) => w.title === item.title)
                                ? styles.active
                                : ""
                            }`}
                            onClick={(e) => toggleWatchlist(e, item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#fff"
                                d={
                                  watchlist.find((w) => w.title === item.title)
                                    ? "M9 16.17l-3.88-3.88L4 13.41l5 5 10-10-1.41-1.41z"
                                    : "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                }
                              />
                            </svg>
                          </div>
                        </div>

                        <div className={styles.meta}>
                          <span>{item.pickuplocation || "Unknown"}</span>
                          <span>{`Closes ${new Date(
                            item.closingdate
                          ).toLocaleDateString("en-NZ", {
                            weekday: "short",
                            day: "numeric",
                            month: "long",
                          })}`}</span>
                        </div>

                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={styles.priceBlock}>
                          <span>Buy Now</span>
                          <strong>${item.buynowprice || "N/A"}</strong>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className={styles.noResults}>No results.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Marketplace;
