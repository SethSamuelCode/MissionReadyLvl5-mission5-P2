import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  // Stores the user's search input
  const [query, setQuery] = useState('');

  // Handles form submission when user presses Enter or clicks search
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim()); // Calls the search function with trimmed input
  };

  return (
    // The search bar form
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      {/* Input field where user types search keywords */}
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search all......"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search icon (magnifying glass) */}
      <svg
        className={styles.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21 21L15.8 15.8M10.5 18C6.4 18 3 14.6 3 10.5C3 6.4 6.4 3 10.5 3C14.6 3 18 6.4 18 10.5C18 14.6 14.6 18 10.5 18Z"
          stroke="#6E6B66"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </form>
  );
};

export default SearchBar;
