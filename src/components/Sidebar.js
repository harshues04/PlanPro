import React from 'react';
import { FaEnvelope, FaChartBar, FaCalendar, FaBell, FaCog } from 'react-icons/fa';

const Sidebar = ({ setActiveSection, scheduledMeetings, notifications, activeSection }) => {
  const handleKeyDown = (e, section) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveSection(section);
    }
  };

  return (
    <nav className="sidebar" role="navigation" aria-label="Main Navigation">
      <div className="logo">PlanPro</div>
      <ul>
        <li
          onClick={() => setActiveSection('chat')}
          onKeyDown={(e) => handleKeyDown(e, 'chat')}
          tabIndex={0}
          role="button"
          aria-label="Chat Section"
          className={activeSection === 'chat' ? 'active' : ''}
        >
          <FaEnvelope /> Chat
        </li>
        <li
          onClick={() => setActiveSection('dashboards')}
          onKeyDown={(e) => handleKeyDown(e, 'dashboards')}
          tabIndex={0}
          role="button"
          aria-label="Dashboards Section"
          className={activeSection === 'dashboards' ? 'active' : ''}
        >
          <FaChartBar /> Dashboards
        </li>
        <li
          onClick={() => setActiveSection('calendar')}
          onKeyDown={(e) => handleKeyDown(e, 'calendar')}
          tabIndex={0}
          role="button"
          aria-label="Calendar Section"
          className={activeSection === 'calendar' ? 'active' : ''}
        >
          <FaCalendar /> Calendar
          {scheduledMeetings.length > 0 && (
            <span className="badge">{scheduledMeetings.length}</span>
          )}
        </li>
        <li
          onClick={() => setActiveSection('notifications')}
          onKeyDown={(e) => handleKeyDown(e, 'notifications')}
          tabIndex={0}
          role="button"
          aria-label="Notifications Section"
          className={activeSection === 'notifications' ? 'active' : ''}
        >
          <FaBell /> Notifications
          {notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
        </li>
        <li
          onClick={() => setActiveSection('settings')}
          onKeyDown={(e) => handleKeyDown(e, 'settings')}
          tabIndex={0}
          role="button"
          aria-label="Settings Section"
          className={activeSection === 'settings' ? 'active' : ''}
        >
          <FaCog /> Settings
        </li>
      </ul>
      <div className="user-profile">
        <img src="/img.png" alt="User Profile" className="user-profile-img" />
        <span>John Doe</span>
      </div>
    </nav>
  );
};

export default Sidebar;