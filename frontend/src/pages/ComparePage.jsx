import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Compare = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:4000/api/items/compare", {
      ids: ["685b34784fa3cef9f9047707", "685b34784fa3cef9f9047709"]
    })
    .then((res) => setItems(res.data))
    .catch((error) => {
      console.error("Compare fetch error:", error);
    })
  }, []);   
  
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
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}> 
      <h1 style={{ marginBottom: '2rem' }}>Compare Items</h1>

      {items.length === 0 ? (
        <p>No items to compare yet..</p>
      ) : (
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Left column */}
          <div style={{ flexShrink: 0 }}>
            {comparisonFields.map(field => (
              <div
                key={field.key}
                style={{
                  fontWeight: 'bold',
                  padding: '1rem',
                  backgroundColor: '#fca311',
                  marginBottom: '2px',
                  minWidth: '150px',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {field.label}
              </div>
            ))}
          </div>

          {/* Items column */}
          {items.map((item) => {
            const image = item.images_links?.[0];
            return (
              <div
                key={item._id}
                style={{
                  border: '1px solid #ddd',
                  flex: 1,
                  backgroundColor: '#fff',
                  minWidth: '200px'
                }}
              >
                {/* Image */}
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <img
                    src={image || 'https://via.placeholder.com/200x150?text=No+Image'}
                    alt={item.title || 'Item image'}
                    style={{ 
                      width: '100%', 
                      maxHeight: '200px', 
                      objectFit: 'contain' 
                    }}
                  />
                </div>

                {/* Field Values */}
                {comparisonFields.map((field, index) => (
                  <div
                    key={`${item._id}-${field.key}`}
                    style={{
                      padding: '1rem',
                      borderTop: '1px solid #eee',
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {item[field.key] || 'N/A'}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Compare;