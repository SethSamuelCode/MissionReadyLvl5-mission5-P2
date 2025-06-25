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

 return (
    <div style={{ padding: "20px" }}>   
        <h1>Compare Page</h1>

        {items.length === 0 ? (
            <p>No items to compare yet..</p>
        ) : (
            <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Condition</th>
                <th>Dimensions</th>
                <th>Weight</th>
                <th>Material</th>
                <th>Pickup Location</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.title || 'N/A'}</td>
                  <td>{item.condition || 'N/A'}</td>
                  <td>{item.dimensions || 'N/A'}</td>
                  <td>{item.weight || 'N/A'}</td>
                  <td>{item.material || 'N/A'}</td>
                  <td>{item.pickupLocation || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
 );
};

export default Compare; 