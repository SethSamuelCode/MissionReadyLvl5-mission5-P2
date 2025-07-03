import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableRow from '../components/TableRow';
import comparePageStyles from './ComparePage.module.css';

const Compare = () => {
  const [allItems, setAllItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/items')
      .then(res => {
        setAllItems(res.data);
        setSearchResults(res.data);
      })
      .catch(err => console.error('Error loading all items:', err));
  }, []);

  useEffect(() => {
    if (selectedIds.length !== 2) {
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
    { label: 'Feature', key: 'features' },
    { label: 'Description', key: 'description' },
    { label: 'Dimensions', key: 'dimensions' },
    { label: 'Weight', key: 'weight' },
    { label: 'Color', key: 'color' },
    { label: 'Seller Review', key: 'sellerReview' },
    { label: 'Shipping', key: 'shippingType' },
    { label: 'Payment', key: 'paymentOptions' },
    { label: 'Brand', key: 'manufacturer' }
  ];

  const handleSearch = () => {
    const query = searchInput.trim().toLowerCase();
    setHasSearched(true);

    if (!query) {
      setSearchResults(allItems);
      return;
    }

    const filtered = allItems.filter(item =>
      item.title?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const currentlySelected = prev.includes(id);
      if (currentlySelected) return prev.filter(x => x !== id);
      if (prev.length < 2) return [...prev, id];
      return prev;
    });
  };

  return (
    <div className={comparePageStyles.compareWrapper}>
      <Header />
      <main className={comparePageStyles.container}>
        <h1 className={comparePageStyles.heading}>Compare Items</h1>

        <div className={comparePageStyles.searchRow}>
          <input
            className={comparePageStyles.searchInput}
            placeholder="Search by title or category"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className={comparePageStyles.addButton} onClick={handleSearch}>Search</button>
        </div>

        {hasSearched && searchResults.length === 0 && (
          <p className={comparePageStyles.noResults}>No matching items found. Try another keyword.</p>
        )}

{hasSearched && searchResults.length > 0 && (
  <div className={comparePageStyles.selectionGrid}>
    {searchResults.map(item => {
      const checked = selectedIds.includes(item._id);
      return (
        <div className={comparePageStyles.card} key={item._id}>
          {/* 🧨 Delete or comment this img element */}
          {/* <img src={item.imagesLinks?.[0] || 'https://via.placeholder.com/200x150'} alt={item.title} /> */}

          <p><strong>{item.title}</strong></p>
          <p className={comparePageStyles.cardDescription}>
            {item.description || 'No description available.'}
          </p>
          <label>
            <input
              type="checkbox"
              checked={checked}
              disabled={!checked && selectedIds.length >= 2}
              onChange={() => toggleSelect(item._id)}
            /> Compare
          </label>
        </div>
      );
    })}
  </div>
)}

        {/* Show comparison only when 2 items are selected */}
        {items.length === 2 && (
          <table className={comparePageStyles.comparisonTable}>
            <tbody>
              <tr className={comparePageStyles.imageRow}>
                <td className={comparePageStyles.labelCell}></td>
                <td className={comparePageStyles.imageCell}>
                  <img
                    src={items[0]?.imagesLinks?.[0] || 'https://via.placeholder.com/220x160'}
                    alt={items[0]?.title || 'Left product'}
                    className={comparePageStyles.productImage}
                  />
                  <div className={comparePageStyles.imageCaption}>{items[0]?.title}</div>
                </td>
                <td className={comparePageStyles.imageCell}>
                  <img
                    src={items[1]?.imagesLinks?.[0] || 'https://via.placeholder.com/220x160'}
                    alt={items[1]?.title || 'Right product'}
                    className={comparePageStyles.productImage}
                  />
                  <div className={comparePageStyles.imageCaption}>{items[1]?.title}</div>
                </td>
              </tr>

              {comparisonFields.map((field, index) => (
                <TableRow
                  key={field.key}
                  label={field.label}
                  left={items[0]?.[field.key] ?? 'N/A'}
                  right={items[1]?.[field.key] ?? 'N/A'}
                  isList={
                    Array.isArray(items[0]?.[field.key]) ||
                    Array.isArray(items[1]?.[field.key])
                  }
                  isStriped={index % 2 === 1}
                />
              ))}
            </tbody>
          </table>
        )}

        {selectedIds.length >= 2 && (
          <p style={{ color: '#999', fontSize: '0.85rem' }}>
            You can only compare 2 items at a time.
          </p>
        )}
      </main>
      <Footer />
      </div>
      </div>
    </div>
  );
};

export default Compare;
