import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatSystem from './components/ChatSystem';
import Dashboards from './components/Dashboards';
import Calendar from './components/Calendar';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Header from './components/Header';
import './styles.css';

function App() {
  const [activeSection, setActiveSection] = useState('chat');
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [gazeData, setGazeData] = useState({ engaged: true, lastActive: Date.now() });

  // Simulate eye-gazing model (replace with actual WebGaze integration)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate gaze detection: randomly determine if user is engaged
      const isEngaged = Math.random() > 0.3; // 70% chance of being engaged
      setGazeData({
        engaged: isEngaged,
        lastActive: isEngaged ? Date.now() : gazeData.lastActive,
      });

      // Notify if user has been disengaged for too long (e.g., 2 minutes)
      const timeSinceLastActive = (Date.now() - gazeData.lastActive) / 1000;
      if (!isEngaged && timeSinceLastActive > 120) {
        setNotifications((prev) => [...prev, 'User appears disengaged in meeting']);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [gazeData.lastActive]);

  return (
    <div
      className={`app ${darkMode ? 'dark-mode' : ''} font-${fontSize}`}
      role="application"
      aria-label="PlanPro Application"
    >
      <Sidebar
        setActiveSection={setActiveSection}
        scheduledMeetings={scheduledMeetings}
        notifications={notifications}
        activeSection={activeSection}
      />
      <div className="main-content">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          fontSize={fontSize}
          setFontSize={setFontSize}
          gazeData={gazeData}
        />
        {activeSection === 'chat' && (
          <ChatSystem
            setScheduledMeetings={setScheduledMeetings}
            setNotifications={setNotifications}
            notifications={notifications}
          />
        )}
        {activeSection === 'dashboards' && <Dashboards />}
        {activeSection === 'calendar' && <Calendar scheduledMeetings={scheduledMeetings} />}
        {activeSection === 'notifications' && <Notifications notifications={notifications} />}
        {activeSection === 'settings' && <Settings />}
      </div>
    </div>
  );
}

export default App;