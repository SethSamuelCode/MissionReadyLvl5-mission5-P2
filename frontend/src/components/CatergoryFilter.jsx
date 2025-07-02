import React, { useState } from 'react';
import styles from './CatergoryFilter.module.css';

const categories = ['Home and Living', 'Office', 'Kitchen', 'Outdoor/Garden', 'All Category'];

const conditions = [
  'New', 'Like New', 'Good - Vintage', 'Excellent', 'Excellent - Restored',
  'Restored', 'Very Good', 'PSA 7 (Near Mint)', 'New - Sealed'
];

const paymentOptions = [
  'Bank Transfer', 'Escrow', 'Credit Card', 'Finance Available', 'Business Credit Card'
];

const shippingOptions = [
  'Insured Premium Shipping Only', 'Insured Courier', 'Specialist Furniture Delivery Only',
  'Pickup Only', 'Specialized Art Courier Only', 'Freight Only',
  'Specialist Piano Movers Only', 'Temperature Controlled Delivery', 'Specialist Bike Courier'
];

const priceOptions = [
  '$0 - $50', '$50 - $100', '$100 - $250', '$250 - $500', '$500 - $1000', '$1000+'
];

const clearanceOptions = ['true', 'false'];

const CatergoryFilter = ({ onFilterSearch }) => {
  const [activeTab, setActiveTab] = useState('All Category');
  const [filters, setFilters] = useState({
    searchBy: '', location: '', condition: '',
    payment: '', shipping: '', price: '',
    clearance: '', keyword: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const query = { ...filters };

    if (activeTab !== 'All Category') {
      query.category = activeTab;
    }

    if (query.price) {
      const [min, max] = query.price.replace(/[$,]/g, '').split(' - ');
      if (min) query.minPrice = parseInt(min);
      if (max) query.maxPrice = parseInt(max);
      delete query.price;
    }

    const hasFilter = Object.values(query).some(v => v !== undefined && v !== '');
    onFilterSearch(hasFilter ? query : {});
  };

  return (
    <div className={styles.wrapper}>
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

      <div className={styles.filters}>
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

        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            name="keyword"
            placeholder="Search Keywords....."
            value={filters.keyword}
            onChange={handleChange}
          />
          <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default CatergoryFilter;
