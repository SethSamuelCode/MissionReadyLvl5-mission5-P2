import { useState } from "react";
import styles from "./Marketplace.module.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CatergoryFilter from "../components/CatergoryFilter";
import Footer from "../components/Footer";

const Marketplace = () => {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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
              !query.searchBy ||
              (query.searchBy === "title" &&
                item.title
                  ?.toLowerCase()
                  .includes(query.keyword?.toLowerCase())) ||
              (query.searchBy === "description" &&
                item.description
                  ?.toLowerCase()
                  .includes(query.keyword?.toLowerCase()));

            const matchesCondition =
              !query.condition ||
              item.condition?.toLowerCase() === query.condition?.toLowerCase();

            const matchesLocation =
              !query.location ||
              item.pickup_location?.toLowerCase() ===
                query.location?.toLowerCase();

            const matchesPayment =
              !query.payment ||
              item.payment_options
                ?.toLowerCase()
                .includes(query.payment?.toLowerCase());

            const matchesShipping =
              !query.shipping ||
              item.shipping_type
                ?.toLowerCase()
                .includes(query.shipping?.toLowerCase());

            const matchesClearance =
              !query.clearance ||
              item.clearance?.toString().toLowerCase() ===
                query.clearance?.toString().toLowerCase();

            const matchesMinPrice =
              query.minPrice === undefined ||
              parseFloat(item.reserve_price || 0) >= query.minPrice;

            const matchesMaxPrice =
              query.maxPrice === undefined ||
              parseFloat(item.reserve_price || 0) <= query.maxPrice;

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
                {results.length > 0 ? (
                  results.map((item) => (
                    <div key={item._id} className={styles.resultCard}>
                      <div className={styles.imageWrapper}>
                        <img
                          src={
                            item.images_links ||
                            "https://www.dealking.co.nz/cdn/shop/files/Bella3SeaterBeige_720x.jpg?v=1694566264"
                          }
                          alt={item.title}
                          className={styles.resultImage}
                        />
                        <div className={styles.starCorner}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#fff"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </div>
                      </div>
                      <div className={styles.meta}>
                        <span>{item.pickup_location || "Unknown"}</span>
                        <span>{`Closes ${new Date(
                          item.closing_date
                        ).toLocaleDateString("en-NZ", {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                        })}`}</span>
                      </div>
                      <h3 className={styles.title}>{item.title}</h3>
                      <div className={styles.priceBlock}>
                        <span>Buy Now</span>
                        <strong>${item.reserve_price || "N/A"}</strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noResults}>No results.</p>
                )}
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
