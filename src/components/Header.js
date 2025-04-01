import React from 'react';

const Header = ({ darkMode, setDarkMode, fontSize, setFontSize, gazeData }) => {
  return (
    <header className="header" role="banner" aria-label="Main Header">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        aria-label="Search"
      />
      <div className="user-options">
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          aria-label="Font Size Adjustment"
        >
          <option value="small">Small Font</option>
          <option value="medium">Medium Font</option>
          <option value="large">Large Font</option>
        </select>
        <div
          className={`gaze-indicator ${gazeData.engaged ? 'engaged' : 'disengaged'}`}
          aria-label={`User Engagement: ${gazeData.engaged ? 'Engaged' : 'Disengaged'}`}
        >
          {gazeData.engaged ? 'Engaged' : 'Disengaged'}
        </div>
        <img
          src="https://via.placeholder.com/30"
          alt="User Avatar"
          className="user-avatar"
        />
      </div>
    </header>
  );
};

export default Header;