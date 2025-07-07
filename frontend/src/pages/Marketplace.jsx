import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Marketplace.module.css";

// Page components
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CatergoryFilter from "../components/CatergoryFilter";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Marketplace = () => {

  // Holds filtered auction results
  const [results, setResults] = useState([]);

  // Tracks if a search has been performed
  const [hasSearched, setHasSearched] = useState(false);
  const location = useLocation();

  // Function to handle search or filter queries
  const handleSearch = async (query) => {
    try {
      const res = await fetch("http://localhost:4000/api/results");
      const json = await res.json();

      if (json.status === "success") {
        let filtered = json.data;

        // Convert string input into a title-based search
        if (typeof query === "string") {
          query = { keyword: query, searchBy: "title" };
        }

        // Apply filters if any are selected
        if (Object.keys(query).length > 0) {
          filtered = filtered.filter((item) => {
            const matchesCategory =
              !query.category ||
              item.category?.toLowerCase() === query.category?.toLowerCase();

            const matchesSearch =
              (!query.searchBy &&
                item.title
                  ?.toLowerCase()
                  .includes(query.keyword?.toLowerCase())) ||
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
              item.pickuplocation?.toLowerCase() ===
                query.location?.toLowerCase();

            const matchesPayment =
              !query.payment ||
              item.paymentoptions
                ?.toLowerCase()
                .includes(query.payment?.toLowerCase());

            const matchesShipping =
              !query.shipping ||
              item.shippingtype
                ?.toLowerCase()
                .includes(query.shipping?.toLowerCase());

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

            // Item must pass all filters
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

  // Auto-perform search if query param is present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search");
    if (keyword) {
      handleSearch(keyword);
    }
  }, [location.search]);

  return (
    // Main page wrapper
    <div className={styles.body}>
      <div className={styles.pageContainer}>
        {/* Header with logo and nav */}
        <Header />
        <main className={styles.page}>
          {/* Top section: search bar + category filters */}
          <div className={styles.searchFilterContainer}>
            <SearchBar onSearch={handleSearch} />
            <CatergoryFilter onFilterSearch={handleSearch} />
          </div>

          {/* Results area */}
          <div className={styles.resultsWrapper}>
            {hasSearched && (
              <div className={styles.resultsContainer}>
                <h1 className={styles.resultsTitle}>Results</h1>
                <div className={styles.resultsSeparator}>
                  {results.length > 0 ? (
                    results.map((item) => {
                      return (
                        <Link
                          to={`/item/${item._id}`}
                          key={item._id}
                          className={styles.resultCard}
                        >
                          {/* Image section with fallback */}
                          <div className={styles.imageWrapper}>
                            <img
                              src={
                                item.imageslinks?.[0] ||
                                "https://www.dealking.co.nz/cdn/shop/files/Bella3SeaterBeige_720x.jpg?v=1694566264"
                              }
                              alt={item.title}
                              className={styles.resultImage}
                            />
                            {/* Star overlay icon */}
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

                          {/* Meta info: location + closing date */}
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

                          {/* Title + pricing */}
                          <h3 className={styles.title}>{item.title}</h3>
                          <div className={styles.priceBlock}>
                            <span>Buy Now</span>
                            <strong>${item.buynowprice || "N/A"}</strong>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p className={styles.noResults}>No results.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Marketplace;
