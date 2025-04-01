import React, { useState, useEffect } from 'react';
import annyang from 'annyang';

const ChatSystem = ({ setScheduledMeetings, setNotifications, notifications }) => {
  const [privateChats, setPrivateChats] = useState({
    'Jane': [{ id: 1, text: 'Hey Jane!', sender: 'user' }],
    'Mike': [{ id: 1, text: 'Hi Mike!', sender: 'user' }],
  });
  const [groupChats, setGroupChats] = useState({
    'Team Alpha': [{ id: 1, text: 'Team meeting at 3 PM', sender: 'user' }],
    'Dev Group': [{ id: 1, text: 'Code review needed', sender: 'user' }],
  });
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingRoom, setMeetingRoom] = useState('Room 1');
  const [sentiment, setSentiment] = useState('neutral'); // Sentiment analysis result

  // Voice Command Setup
  useEffect(() => {
    if (annyang) {
      const commands = {
        'send message *text': (text) => {
          setNewMessage(text);
          handleSend();
        },
        'schedule meeting': () => setIsModalOpen(true),
        'select chat *name': (name) => {
          const chatType = Object.keys(privateChats).includes(name) ? 'private' : 'group';
          setActiveChat({ type: chatType, name });
        },
      };
      annyang.addCommands(commands);
      annyang.start();
    }
    return () => {
      if (annyang) annyang.abort();
    };
  }, [activeChat, newMessage]);

  // Sentiment Analysis (Simplified)
  const analyzeSentiment = (text) => {
    const positiveWords = ['great', 'good', 'awesome', 'happy'];
    const negativeWords = ['bad', 'terrible', 'sad', 'angry'];
    const lowerText = text.toLowerCase();
    if (positiveWords.some(word => lowerText.includes(word))) return 'positive';
    if (negativeWords.some(word => lowerText.includes(word))) return 'negative';
    return 'neutral';
  };

  const handleSend = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message = { id: Date.now(), text: newMessage, sender: 'user' };
    if (activeChat.type === 'private') {
      setPrivateChats((prev) => ({
        ...prev,
        [activeChat.name]: [...(prev[activeChat.name] || []), message],
      }));
    } else {
      setGroupChats((prev) => ({
        ...prev,
        [activeChat.name]: [...prev[activeChat.name], message],
      }));
    }

    // Sentiment Analysis
    const sentimentResult = analyzeSentiment(newMessage);
    setSentiment(sentimentResult);
    if (sentimentResult === 'negative') {
      setNotifications((prev) => [...prev, `Negative sentiment detected in ${activeChat.name}`]);
    }

    // AI Assistant Responses
    setTimeout(() => {
      let aiResponse;
      const lowerMessage = newMessage.toLowerCase();
      if (lowerMessage.includes('schedule meeting')) {
        setIsModalOpen(true);
        aiResponse = { id: Date.now() + 1, text: 'Let’s schedule that meeting. Please pick a date and room.', sender: 'ai' };
      } else if (lowerMessage.includes('remind me')) {
        aiResponse = { id: Date.now() + 1, text: 'Reminder set for your request!', sender: 'ai' };
        setNotifications((prev) => [...prev, `Reminder: ${newMessage}`]);
      } else if (lowerMessage.includes('summarize')) {
        const chatHistory = activeChat.type === 'private' 
          ? privateChats[activeChat.name] 
          : groupChats[activeChat.name];
        const summary = chatHistory.map(m => m.text).join(' ').slice(0, 100) + '...';
        aiResponse = { id: Date.now() + 1, text: `Summary: ${summary}`, sender: 'ai' };
      } else if (lowerMessage.includes('action item')) {
        aiResponse = { id: Date.now() + 1, text: `Action Item: ${newMessage.replace('action item', '').trim()}`, sender: 'ai' };
        setNotifications((prev) => [...prev, `Action Item: ${newMessage.replace('action item', '').trim()}`]);
      } else {
        aiResponse = { id: Date.now() + 1, text: 'Got it! How can I assist further?', sender: 'ai' };
      }

      if (activeChat.type === 'private') {
        setPrivateChats((prev) => ({
          ...prev,
          [activeChat.name]: [...prev[activeChat.name], aiResponse],
        }));
      } else {
        setGroupChats((prev) => ({
          ...prev,
          [activeChat.name]: [...prev[activeChat.name], aiResponse],
        }));
      }
    }, 1000);

    setNewMessage('');
  };

  const handleScheduleMeeting = () => {
    if (!meetingDate || !activeChat) return;
    const meeting = { id: Date.now(), date: meetingDate, room: meetingRoom, chat: activeChat.name };
    setScheduledMeetings((prev) => [...prev, meeting]);
    setNotifications((prev) => [...prev, `Meeting scheduled in ${activeChat.name} on ${meetingDate}`]);

    const message = { id: Date.now(), text: `Meeting scheduled on ${meetingDate} in ${meetingRoom}`, sender: 'ai' };
    if (activeChat.type === 'private') {
      setPrivateChats((prev) => ({
        ...prev,
        [activeChat.name]: [...prev[activeChat.name], message],
      }));
    } else {
      setGroupChats((prev) => ({
        ...prev,
        [activeChat.name]: [...prev[activeChat.name], message],
      }));
    }
    setIsModalOpen(false);
    setMeetingDate('');
  };

  const currentMessages = activeChat 
    ? (activeChat.type === 'private' ? privateChats[activeChat.name] : groupChats[activeChat.name]) 
    : [];

  return (
    <div className="chat-system" role="region" aria-label="Chat System">
      <div className="chat-list">
        <h3>Private Chats</h3>
        <ul>
          {Object.keys(privateChats).map((name) => (
            <li
              key={name}
              onClick={() => setActiveChat({ type: 'private', name })}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveChat({ type: 'private', name })}
              tabIndex={0}
              role="button"
              aria-label={`Select chat with ${name}`}
            >
              {name}
            </li>
          ))}
        </ul>
        <h3>Group Chats</h3>
        <ul>
          {Object.keys(groupChats).map((name) => (
            <li
              key={name}
              onClick={() => setActiveChat({ type: 'group', name })}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveChat({ type: 'group', name })}
              tabIndex={0}
              role="button"
              aria-label={`Select group chat ${name}`}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        {activeChat ? (
          <>
            <h3>{activeChat.name} ({activeChat.type})</h3>
            <div className="sentiment-indicator" aria-label={`Team Sentiment: ${sentiment}`}>
              Sentiment: {sentiment}
            </div>
            <div className="messages" role="log" aria-label="Chat Messages">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'ai' ? 'ai-message' : 'user-message'}`}
                >
                  {msg.sender === 'ai' && <span className="ai-label">AI: </span>}
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${activeChat.name}... (e.g., "schedule meeting", "remind me", "summarize", "action item")`}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                aria-label={`Message input for ${activeChat.name}`}
              />
              <button
                onClick={handleSend}
                aria-label="Send Message"
              >
                Send
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                aria-label="Schedule Meeting"
              >
                Schedule Meeting
              </button>
            </div>
          </>
        ) : (
          <p>Select a chat to start messaging.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" role="dialog" aria-label="Schedule Meeting Dialog">
            <h3>Schedule a Meeting in {activeChat?.name}</h3>
            <label>
              Date:
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                aria-label="Meeting Date"
              />
            </label>
            <label>
              Room:
              <select
                value={meetingRoom}
                onChange={(e) => setMeetingRoom(e.target.value)}
                aria-label="Meeting Room"
              >
                <option value="Room 1">Room 1</option>
                <option value="Room 2">Room 2</option>
                <option value="Room 3">Room 3</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button onClick={handleScheduleMeeting} aria-label="Schedule Meeting">
                Schedule
              </button>
              <button onClick={() => setIsModalOpen(false)} aria-label="Cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSystem;