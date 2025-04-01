import React from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = ({ scheduledMeetings }) => {
  const meetingDates = scheduledMeetings.map((m) => new Date(m.date));

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <div className="calendar-container">
        <CalendarComponent
          tileContent={({ date, view }) => {
            if (view === 'month' && meetingDates.some((d) => d.toDateString() === date.toDateString())) {
              return <span className="meeting-dot">•</span>;
            }
            return null;
          }}
        />
      </div>
      <div className="scheduled-meetings">
        <h4>Scheduled Meetings</h4>
        {scheduledMeetings.length === 0 ? (
          <p>No meetings scheduled.</p>
        ) : (
          <ul>
            {scheduledMeetings.map((meeting) => (
              <li key={meeting.id}>
                {meeting.date} - {meeting.room} ({meeting.chat})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Calendar;