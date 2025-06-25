import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ComparePage.module.css';

const Compare = () => {
  const [allItems, setAllItems] = useState([]);          // full list of items
  const [selectedIds, setSelectedIds] = useState([]);     // selected item IDs
  const [comparisonItems, setComparisonItems] = useState([]); // fetched compare data

  // Fetch all items for selection
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/items')
      .then((res) => setAllItems(res.data))
      .catch((err) => console.error('Error loading items:', err));
  }, []);

  // Fetch comparison data when 2 IDs are selected
  useEffect(() => {
    if (selectedIds.length === 2) {
      axios
        .post('http://localhost:4000/api/items/compare', { ids: selectedIds })
        .then((res) => setComparisonItems(res.data))
        .catch((err) => console.error('Compare fetch error:', err));
    } else {
      setComparisonItems([]);
    }
  }, [selectedIds]);

  const handleCompareToggle = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else if (selectedIds.length < 2) {
      setSelectedIds([...selectedIds, itemId]);
    }
  };

  const comparisonFields = [
    { label: 'Title', key: 'title' },
    { label: 'Condition', key: 'condition' },
    { label: 'Dimensions', key: 'dimensions' },
    { label: 'Weight', key: 'weight' },
    { label: 'Material', key: 'material' },
    { label: 'Pickup Location', key: 'pickupLocation' },
    { label: 'Description', key: 'description' }
  ];

  return (
    <div className={styles.compareWrapper}>
      <h1 className={styles.heading}>Comparison Table</h1>

      {/* Search Bar */}
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Search product by name, Brand, categories"
          className={styles.searchInput}
        />
        <button className={styles.addButton}>Add</button>
      </div>

      {/* Selectable Item Cards */}
      <div className={styles.selectionGrid}>
        {allItems.map((item) => {
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
                  onChange={() => handleCompareToggle(item._id)}
                  disabled={!isChecked && selectedIds.length >= 2}
                />
                Compare
              </label>
            </div>
          );
        })}
      </div>

      {/* Selected Preview (above table) */}
      <div className={styles.selectedItems}>
        {comparisonItems.map((item) => (
          <div key={item._id} className={styles.selectedCard}>
            <img
              src={item.images_links?.[0] || 'https://via.placeholder.com/100x70'}
              alt={item.title}
            />
            <div className={styles.itemLocation}>{item.pickupLocation || 'Location N/A'}</div>
            <div className={styles.itemClose}>
              Closes {new Date(item.closingDate).toDateString()}
            </div>
            <div className={styles.itemTitle}>{item.title}</div>
            <button
              className={styles.removeBtn}
              onClick={() => setSelectedIds(prev => prev.filter(id => id !== item._id))}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {comparisonItems.length === 2 && (
        <div className={styles.comparisonGrid}>
          <div className={styles.leftColumn}>
            {comparisonFields.map((field) => (
              <div key={field.key} className={styles.fieldLabel}>
                {field.label}
              </div>
            ))}
          </div>

          {comparisonItems.map((item) => (
            <div key={item._id} className={styles.itemColumn}>
              <div className={styles.imageContainer}>
                <img
                  src={item.images_links?.[0] || 'https://via.placeholder.com/200x150'}
                  alt={item.title}
                />
              </div>
              {comparisonFields.map((field) => (
                <div key={field.key} className={styles.fieldValue}>
                  {item[field.key] || 'N/A'}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compare;
