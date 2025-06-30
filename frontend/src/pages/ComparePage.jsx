import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ComparePage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Compare = () => {
  const [allItems, setAllItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/items')
      .then(res => setAllItems(res.data))
      .catch(err => console.error('Error loading all items:', err));
  }, []);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setItems([]);
      return;
    }
    axios
      .post('http://localhost:4000/api/items/compare', { ids: selectedIds })
      .then(res => setItems(res.data))
      .catch(err => console.error('Compare fetch error:', err));
  }, [selectedIds]);

  const comparisonFields = [
    { label: 'Listing Price', key: 'current_BidPrice' },
    { label: 'Condition', key: 'condition' },
    { label: 'Feature', key: 'material' }, // This will work as a feature
    { label: 'Description', key: 'description' },
    { label: 'Dimension', key: 'dimensions' },
    { label: 'Weight', key: 'weight' },
    { label: 'Color', key: 'color' },
    { label: 'Seller Review', key: 'owner' }, // Temporary placeholder
    { label: 'Shipping', key: 'shippingType' },
    { label: 'Payment', key: 'paymentOptions' },
    { label: 'Brand', key: 'manufacturer' }
  ];
  console.log(items[0]);


  
  const handleSearch = () => {
    const filtered = allItems.filter(item =>
      item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filtered);
    setSearchInput('');
  };

  return (
        <div className={styles.compareWrapper}> 
      <Header />    
      <div className={styles.container}>
      <h1 className={styles.heading}>Compare Items</h1>

      {/* Search */}    
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Search item by title or category"
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) =>{if (e.key === 'Enter'){handleSearch();
          }
        }}  
        />
        <button className={styles.addButton} onClick={handleSearch}>
          Add
        </button>
      </div>

      {/* Show search results (no cards shown by default) */}
      {searchResults.length === 0 && (
  <p className={styles.noResults}>No matching items found. Try another keyword.</p>
)}

{searchResults.length > 0 && (
  <div className={styles.selectionGrid}>
    {searchResults.map(item => {
      const image = item.images_links?.[0];
      const isChecked = selectedIds.includes(item._id);
      return (
        <div key={item._id} className={styles.card}>
          <img
            src={image || 'https://via.placeholder.com/200x150?text=No+Image'}
            alt={item.title}
          />
          <p><strong>{item.title || 'No Title'}</strong></p>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              disabled={!isChecked && selectedIds.length >= 2}
              onChange={() =>
                setSelectedIds(prev =>
                  isChecked
                    ? prev.filter(id => id !== item._id)
                    : [...prev, item._id]
                )
              }
            /> Compare
          </label>
        </div>
      );
    })}
  </div>
)}

      {/* Optional message */}
      {selectedIds.length >= 2 && (
        <p style={{ color: '#999', fontSize: '0.85rem' }}>
          You can only compare 2 items at a time.
        </p>
      )}

      {/* Comparison Grid */}
      {items.length === 2 && (
        <div className={styles.comparisonGrid}>
          <div className={styles.leftColumn}>
            {comparisonFields.map(field => (
              <div key={field.key} className={styles.fieldLabel}>
                {field.label}
              </div>
            ))}
          </div>
          {items.map(item => (
            <div key={item._id} className={styles.itemColumn}>
              <div className={styles.imageContainer}>
                <img
                  src={item.images_links?.[0] || 'https://via.placeholder.com/200x150'}
                  alt={item.title}
                />
              </div>
              {comparisonFields.map(field => (
                <div key={field.key} className={styles.fieldValue}>
                {item[field.key] ? item[field.key] : '—'}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}  
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
