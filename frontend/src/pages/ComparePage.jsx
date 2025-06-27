// Core imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ComparePage.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Main Compare component
const Compare = () => {
  // State management
  const [allItems, setAllItems] = useState([]);        // Stores all items from API
  const [searchInput, setSearchInput] = useState('');  // Search input value
  const [searchResults, setSearchResults] = useState([]); // Filtered search results
  const [selectedIds, setSelectedIds] = useState([]);   // Currently selected item IDs
  const [items, setItems] = useState([]);              // Full item data for comparison

  // Fetch all items on component mount
  useEffect(() => {
    axios.get('http://localhost:4000/api/items')
      .then(res => setAllItems(res.data))
      .catch(err => console.error('Error loading items:', err));
  }, []);

  // Fetch detailed item data when selection changes
  //This runs anytime the selection changes. If there are two items selected, it fetches their full data for the comparison table below
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

  // Fields to display in comparison table
 //Because we use camelCase consistently across the backend and frontend,
 // we n loop through fields and render them dynamically — no hardcoded rows
  const comparisonFields = [
    { label: 'Title', key: 'title' },
    { label: 'Condition', key: 'condition' },
    { label: 'Dimensions', key: 'dimensions' },
    { label: 'Weight', key: 'weight' },
    { label: 'Material', key: 'material' },
    { label: 'Pickup Location', key: 'pickupLocation' },
    { label: 'Description', key: 'description' }
  ];

  // My search logic — it lets users search by title or category, filters the results, and resets the input
  const handleSearch = () => {
    const filtered = allItems.filter(item =>
      item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filtered);
    setSearchInput('');  // Clear search input after search
  };

  // Remove item from comparison
  const handleRemove = (id) => {
    setSelectedIds(prev => prev.filter(itemId => itemId !== id));
  };
  
  return (
    <div className={styles.compareWrapper}>
      <Header />    
      <h1 className={styles.heading}>Compare Items</h1>

      {/* Search Section */}
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Search item by title or category"
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className={styles.addButton} onClick={handleSearch}>
          Add
        </button>
      </div>

      {/* Selected Items Display */}
      <div className={styles.selectedTags}>
        {items.map(item => (
          <div key={item._id} className={styles.tag}>
            {item.title}
            <button 
              onClick={() => handleRemove(item._id)}
              className={styles.removeTag}
              aria-label={`Remove ${item.title}`}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className={styles.selectionGrid}>
          {searchResults.map(item => (
            <div key={item._id} className={styles.card}>
              {/* Item card content */}
            </div>
          ))}
        </div>
      )}

      {/* Max Items Message */}
      {selectedIds.length >= 2 && (
        <p className={styles.message}>
          Maximum of 2 items for comparison
        </p>
      )}

      {/* Comparison Table */}
      {items.length === 2 && (
        <div className={styles.comparisonGrid}>
          {/* Table content */}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Compare;