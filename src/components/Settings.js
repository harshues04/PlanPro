import React from 'react';

const Settings = () => {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings-section">
        <h3>Profile</h3>
        <p>Name: Harshita Anand</p>
        <p>Email: harshita.anand@example.com</p>
      </div>
      <div className="settings-section">
        <h3>Preferences</h3>
        <label>
          <input type="checkbox" /> Enable notifications
        </label>
        <label>
          <input type="checkbox" /> Sound alerts
        </label>
      </div>
    </div>
  );
};

export default Settings;