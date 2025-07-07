import React, { useState } from 'react';
import styles from './CatergoryFilter.module.css';

// List of available category tabs users can select
const categories = ['Home and Living', 'Office', 'Kitchen', 'Outdoor/Garden', 'All Category'];

// List of item conditions the user can filter by
const conditions = [
  'New', 'Like New', 'Good - Vintage', 'Excellent', 'Excellent - Restored',
  'Restored', 'Very Good', 'PSA 7 (Near Mint)', 'New - Sealed'
];

// Payment method filter options
const paymentOptions = [
  'Bank Transfer', 'Escrow', 'Credit Card', 'Finance Available', 'Business Credit Card'
];

// Shipping method filter options
const shippingOptions = [
  'Insured Premium Shipping Only', 'Insured Courier', 'Specialist Furniture Delivery Only',
  'Pickup Only', 'Specialized Art Courier Only', 'Freight Only',
  'Specialist Piano Movers Only', 'Temperature Controlled Delivery', 'Specialist Bike Courier'
];

// Price ranges users can choose from
const priceOptions = [
  '$0 - $50', '$50 - $100', '$100 - $250', '$250 - $500', '$500 - $1000',
  '$1000 - $5000', '$5000 - $10000', '$10000 - $25000', '$25000 - $50000',
  '$50000 - $100000', '$100000 - $250000', '$250000 - $500000', '$500000+'
];

// Whether to filter for clearance items
const clearanceOptions = ['true', 'false'];

const CatergoryFilter = ({ onFilterSearch }) => {

  // Ensures page loads on the "All Category" tab
  const [activeTab, setActiveTab] = useState('All Category');

  // Tracks the user's selected filter values
  const [filters, setFilters] = useState({
    searchBy: '', location: '', condition: '',
    payment: '', shipping: '', price: '',
    clearance: '', keyword: ''
  });

  // Updates the filter state when a dropdown or input changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Runs the search based on selected filters
  const handleSearch = () => {
    const query = { ...filters };

    // If a specific category tab is selected, add it to the query
    if (activeTab !== 'All Category') {
      query.category = activeTab;
    }

    // Convert selected price range string to numerical min/max values
    if (query.price) {
      const [min, max] = query.price.replace(/[$,]/g, '').split(' - ');
      if (min) query.minPrice = parseInt(min);
      if (max && !isNaN(max)) query.maxPrice = parseInt(max);

      // remove original price string
      delete query.price; 
    }

    // If a keyword is typed but no specific field is selected, search both title and description
    if (query.keyword) {
      if (!query.searchBy) {
        query.searchBy = ['title', 'description'];
      }
    }

    // Only send query if at least one filter is applied
    const hasFilter = Object.values(query).some(v => v !== undefined && v !== '');
    onFilterSearch(hasFilter ? query : {});
  };

  // If user presses Enter key in the input, trigger search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.wrapper}>

      {/* Category selection tabs */}
      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.tab} ${activeTab === cat ? styles.active : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dropdown filters and keyword input */}
      <div className={styles.filters}>

        {/* Top row of dropdowns */}
        <div className={styles.topFilters}>
          <select name="searchBy" value={filters.searchBy} onChange={handleChange}>
            <option value="">Search by</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>

          <select name="location" value={filters.location} onChange={handleChange}>
            <option value="">Location</option>
            <option value="Auckland, NZ">Auckland</option>
            <option value="Wellington, NZ">Wellington</option>
            <option value="Christchurch, NZ">Christchurch</option>
          </select>

          <select name="condition" value={filters.condition} onChange={handleChange}>
            <option value="">Condition</option>
            {conditions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Bottom row of dropdowns */}
        <div className={styles.bottomFilters}>
          <select name="payment" value={filters.payment} onChange={handleChange}>
            <option value="">Payment</option>
            {paymentOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select name="shipping" value={filters.shipping} onChange={handleChange}>
            <option value="">Shipping</option>
            {shippingOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select name="price" value={filters.price} onChange={handleChange}>
            <option value="">Price</option>
            {priceOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select name="clearance" value={filters.clearance} onChange={handleChange}>
            <option value="">Clearance</option>
            {clearanceOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Search input and search button */}
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            name="keyword"
            placeholder="Search Keywords....."
            value={filters.keyword}
            onChange={handleChange}

            // press enter to trigger search
            onKeyDown={handleKeyDown} 
          />
          <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default CatergoryFilter;
